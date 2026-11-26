import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// The content manager used to live at /admin/index.html; keep old bookmarks working.
export const GET: RequestHandler = () => redirect(308, '/admin');
