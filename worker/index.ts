/**
 * Worker entry point.
 *
 * This project began life as a Cloudflare Pages app, where everything under
 * functions/ was routed by filename. Workers use a single entry script, so this
 * module reproduces that routing table explicitly and hands anything it does not
 * recognise to the static assets in dist/ (SPA fallback handled by the ASSETS
 * binding's not_found_handling).
 *
 * The handlers themselves are still the Pages Functions, called with the same
 * { request, env } context shape they expect.
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
    const { pathname } = new URL(request.url);

    const handler = ROUTES[pathname.replace(/\/+$/, '') || '/'];
    if (handler) {
      return handler({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
