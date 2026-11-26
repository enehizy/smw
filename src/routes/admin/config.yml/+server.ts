import { error } from '@sveltejs/kit';
import config from '#lib/server/cms/config.yml?raw';
import { hasSession } from '#lib/server/admin-session.ts';
import type { RequestHandler } from './$types';

export const prerender = false;

// The CMS config, with `api_root` pointing the CMS at this site's GitHub proxy.
// Sveltia requires an absolute URL, so it's added per request from the site's own origin.
export const GET: RequestHandler = ({ cookies, url }) => {
	if (!hasSession(cookies)) error(401, 'Not signed in.');

	const body = config.replace(
		/^(\s+)branch: main$/m,
		`$1branch: main\n$1api_root: ${url.origin}/admin/github`
	);

	return new Response(body, {
		headers: { 'Content-Type': 'application/yaml; charset=utf-8', 'Cache-Control': 'no-store' }
	});
};
