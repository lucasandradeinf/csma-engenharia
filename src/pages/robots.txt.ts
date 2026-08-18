import type { APIRoute } from 'astro';
import { withBase } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const path = withBase('sitemap-index.xml');
  const sitemap = site ? new URL(path, site).href : path;

  return new Response(['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
