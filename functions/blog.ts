/**
 * Blog Cloudflare Function
 *
 * Delegates to the unified /api/data handler so blog data goes through
 * the standard KV → local JSON fallback chain.
 *
 * Previously this function fetched directly from JSONBin, bypassing
 * the caching and fallback layers. Now it delegates to the shared API.
 *
 * Kept as a standalone function for backward-compatible URL support
 * (e.g. /blog?locale=en still works).
 */

import { onRequest as onDataRequest } from './api/data';

export async function onRequest(context: { request: Request; env: Record<string, any> }) {
  const { request, env } = context;
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale') || 'en';

  // Rewrite onto the unified data API and call it in-process. Re-entering over
  // the network would recurse into this same Worker.
  const apiUrl = new URL(request.url);
  apiUrl.pathname = '/api/data';
  apiUrl.search = `?resource=blog&locale=${encodeURIComponent(locale)}`;

  const proxied = new Request(apiUrl.toString(), request);
  return onDataRequest({ request: proxied, env });
}
