/**
 * Cloudflare Function that proxies image uploads to Cloudinary or falls back to Base64 Data URL.
 */

async function fileToDataUrl(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:${file.type || 'image/png'};base64,${base64}`;
}

export async function onRequest(context: { request: Request; env: Record<string, any> }) {
  const { request, env } = context;

  // Only accept POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'Missing file in upload' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cloudName = env.CLOUDINARY_CLOUD_NAME || 'dkxlhxpe4';
    const uploadPreset = env.CLOUDINARY_UPLOAD_PRESET;
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;
    const folder = formData.get('folder')?.toString() || 'brand-icons';

    // Attempt Cloudinary upload if any configuration is present
    if (uploadPreset || (apiKey && apiSecret)) {
      try {
        const cloudinaryForm = new FormData();
        cloudinaryForm.set('file', file);
        cloudinaryForm.set('folder', folder);

        if (uploadPreset) {
          cloudinaryForm.set('upload_preset', uploadPreset);
        } else if (apiKey && apiSecret) {
          const timestamp = Math.round(Date.now() / 1000);
          const paramsToSign = new URLSearchParams();
          paramsToSign.set('folder', folder);
          paramsToSign.set('timestamp', String(timestamp));

          const sortedKeys = Array.from(paramsToSign.keys()).sort();
          const signatureString = sortedKeys
            .map((k) => `${k}=${paramsToSign.get(k)}`)
            .join('&') + apiSecret;

          const encoder = new TextEncoder();
          const signatureBuffer = await crypto.subtle.digest('SHA-1', encoder.encode(signatureString));
          const signature = Array.from(new Uint8Array(signatureBuffer))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');

          cloudinaryForm.set('timestamp', String(timestamp));
          cloudinaryForm.set('api_key', apiKey);
          cloudinaryForm.set('signature', signature);
        }

        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          body: cloudinaryForm,
        });

        const result: any = await uploadResponse.json();

        if (uploadResponse.ok && result.secure_url) {
          return new Response(JSON.stringify({ secure_url: result.secure_url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        console.warn('[Cloudflare Function] Cloudinary upload returned error:', result);
      } catch (cloudErr) {
        console.warn('[Cloudflare Function] Cloudinary fetch error:', cloudErr);
      }
    }

    // Fallback: Convert file directly to Base64 Data URL so uploads never fail
    const dataUrl = await fileToDataUrl(file);
    return new Response(JSON.stringify({ secure_url: dataUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[Cloudflare Function] Upload error:', error);
    return new Response(
      JSON.stringify({ error: error?.message ?? 'Internal error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
