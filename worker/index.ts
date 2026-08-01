/**
 * Worker entry point.
 *
 * Reproduces API routing table and hands static asset requests to env.ASSETS,
 * falling back to /index.html for client-side SPA routing.
 */

import { onRequest as onData } from '../functions/api/data';
import { onRequest as onUpload } from '../functions/api/upload';
import { onRequest as onInitData } from '../functions/init-data';
import { onRequest as onBlog } from '../functions/blog';

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  KV_LOBSTER?: KVNamespace;
  [key: string]: any;
}

const ROUTES: Record<
  string,
  (context: { request: Request; env: Env }) => Promise<Response>
> = {
  '/api/data': onData,
  '/api/upload': onUpload,
  '/init-data': onInitData,
  '/blog': onBlog,
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    const handler = ROUTES[pathname];
    if (handler) {
      return handler({ request, env });
    }

    // Serve asset directly if found
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // Fallback to /index.html for SPA routes
    const indexUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(indexUrl, { method: 'GET' }));
  },
};
