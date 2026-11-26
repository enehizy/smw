import { redirect } from '@sveltejs/kit';
import { hasSession } from '#lib/server/admin-session.ts';
import type { RequestHandler } from './$types';

export const prerender = false;

const SVELTIA = 'https://unpkg.com/@sveltia/cms@0.273.1/dist/sveltia-cms.js';

// Sveltia CMS signs in by itself from this stored account. The key is a placeholder: every GitHub
// request goes through /admin/github, which checks the session cookie and adds the real key there.
// When the editor signs out inside the CMS, Sveltia clears the account; end the session too.
const bootstrap = `
	try {
		localStorage.setItem('sveltia-cms.user', JSON.stringify({ backendName: 'github', token: 'server-proxy' }));
		const setItem = Storage.prototype.setItem;
		Storage.prototype.setItem = function (key, value) {
			setItem.call(this, key, value);
			if (key === 'sveltia-cms.user' && value === '{}') location.href = '/admin/logout';
		};
	} catch {}
`;

const page = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex" />
		<title>SMW Content Manager</title>
		<link href="/admin/config.yml" type="application/yaml" rel="cms-config-url" />
		<script>${bootstrap}</script>
		<script src="${SVELTIA}" type="module"></script>
	</head>
	<body></body>
</html>`;

export const GET: RequestHandler = ({ cookies }) => {
	if (!hasSession(cookies)) redirect(303, '/admin/login');

	return new Response(page, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'no-store',
			'X-Robots-Tag': 'noindex'
		}
	});
};
