/**
 * Worker entry point.
 *
 * This project began life as a Cloudflare Pages app, where everything under
 * functions/ was routed by filename. Workers use a single entry script, so this
 * module reproduces that routing table explicitly and hands anything it does not
 * recognise to the static assets in dist/ (SPA fallback handled by ASSETS binding).
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

    // Try serving requested asset from dist/
    let response = await env.ASSETS.fetch(request);

    // If 404 and no file extension in pathname, fallback to index.html for SPA routing
    if ((response.status === 404 || response.status === 405) && !/\.[a-zA-Z0-9]+$/.test(pathname)) {
      const indexRequest = new Request(new URL('/index.html', request.url).toString(), {
        method: 'GET',
        headers: request.headers,
      });
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  },
};
