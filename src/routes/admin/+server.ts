import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Sveltia CMS is a static page (static/admin/index.html); send /admin there on every host.
export const GET: RequestHandler = () => redirect(308, '/admin/index.html');
