import { error, json, redirect } from '@sveltejs/kit';
import { hasSession } from '#lib/server/admin-session.ts';
import { installationToken, REPO_NAME, REPO_OWNER } from '#lib/server/github-app.ts';
import type { RequestHandler } from './$types';

export const prerender = false;

// GitHub proxy for the content manager. The CMS (configured with api_root = /admin/github) sends
// REST calls to /admin/github/api/v3/* and GraphQL to /admin/github/api/graphql. This forwards them
// to GitHub with a short-lived GitHub App key, so no GitHub key ever reaches the browser.

const API = 'https://api.github.com';
const REPO_PATH = `/repos/${REPO_OWNER}/${REPO_NAME}`;

// Sveltia asks GitHub who is signed in; an App key has no user, so answer for the shared editor login.
const EDITOR = {
	id: 1,
	login: 'smw-editor',
	name: 'SMW Editor',
	email: null,
	avatar_url: '',
	html_url: '',
	type: 'User'
};

const FORWARD_REQUEST_HEADERS = ['accept', 'content-type', 'if-none-match', 'if-modified-since'];
const FORWARD_RESPONSE_HEADERS = [
	'content-type',
	'etag',
	'last-modified',
	'link',
	'retry-after',
	'x-ratelimit-limit',
	'x-ratelimit-remaining',
	'x-ratelimit-reset'
];

const handler: RequestHandler = async ({ cookies, params, request, url }) => {
	const path = `/${params.path}`;

	// Links like "view on GitHub" are built from api_root; send those to github.com.
	if (!path.startsWith('/api/')) redirect(302, `https://github.com${path}${url.search}`, { external: true });

	if (!hasSession(cookies)) error(401, 'Not signed in.');

	let target: string;
	if (path === '/api/graphql') {
		target = `${API}/graphql`;
	} else if (path.startsWith('/api/v3/')) {
		const rest = path.slice('/api/v3'.length);
		if (rest === '/user') return json(EDITOR);
		if (rest !== '/rate_limit' && rest !== REPO_PATH && !rest.startsWith(`${REPO_PATH}/`)) {
			error(403, 'Only this site’s repository can be accessed.');
		}
		target = `${API}${rest}${url.search}`;
	} else {
		error(404, 'Not found.');
	}

	const headers = new Headers({
		Authorization: `token ${await installationToken()}`,
		'User-Agent': 'smw-content-manager',
		'X-GitHub-Api-Version': '2022-11-28'
	});
	for (const name of FORWARD_REQUEST_HEADERS) {
		const value = request.headers.get(name);
		if (value) headers.set(name, value);
	}

	const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
	const res = await fetch(target, {
		method: request.method,
		headers,
		body: hasBody ? await request.arrayBuffer() : undefined
	});

	const out = new Headers({ 'Cache-Control': 'no-store' });
	for (const name of FORWARD_RESPONSE_HEADERS) {
		const value = res.headers.get(name);
		// Keep pagination links pointing at this proxy.
		if (value) out.set(name, name === 'link' ? value.replaceAll(API, `${url.origin}/admin/github/api/v3`) : value);
	}

	// An App key can't report the signed-in user's permissions; editors are allowed to save.
	if (request.method === 'GET' && path === `/api/v3${REPO_PATH}` && res.ok) {
		const repo = await res.json();
		repo.permissions = { admin: false, maintain: false, push: true, triage: false, pull: true };
		return json(repo, { headers: out });
	}

	return new Response(res.body, { status: res.status, headers: out });
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
