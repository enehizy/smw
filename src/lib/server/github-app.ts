import { createSign } from 'node:crypto';
import { GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY } from '$app/env/private';

// Short-lived GitHub keys for the content manager, minted from a GitHub App.
// The App's private key never expires and never leaves the server; each minted key is limited to
// this repo's contents and expires after an hour, and is only ever used by the /admin/github proxy.

export const REPO_OWNER = 'enehizy';
export const REPO_NAME = 'smw';

const API = 'https://api.github.com';
const HEADERS = {
	Accept: 'application/vnd.github+json',
	'X-GitHub-Api-Version': '2022-11-28',
	'User-Agent': 'smw-content-manager'
};

export function githubAppConfigured() {
	return !!GITHUB_APP_ID && !!GITHUB_APP_PRIVATE_KEY;
}

function privateKey() {
	let key = (GITHUB_APP_PRIVATE_KEY ?? '').trim();
	if (!key.includes('-----BEGIN')) key = Buffer.from(key, 'base64').toString('utf8');
	return key.replace(/\\n/g, '\n');
}

function appJwt() {
	const now = Math.floor(Date.now() / 1000);
	const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');
	// Backdate a minute to allow for clock drift; GitHub caps the lifetime at 10 minutes.
	const body = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({ iat: now - 60, exp: now + 540, iss: GITHUB_APP_ID })}`;
	const signature = createSign('RSA-SHA256').update(body).sign(privateKey(), 'base64url');
	return `${body}.${signature}`;
}

async function github<T>(path: string, init: RequestInit = {}): Promise<T> {
	const res = await fetch(`${API}${path}`, {
		...init,
		headers: { ...HEADERS, Authorization: `Bearer ${appJwt()}`, ...init.headers }
	});
	if (!res.ok) {
		throw new Error(`GitHub App request ${path} failed: ${res.status} ${await res.text()}`);
	}
	return res.json() as Promise<T>;
}

let cached: { token: string; expiresAt: number } | undefined;

export async function installationToken() {
	// Reuse a key until five minutes before it expires.
	if (cached && cached.expiresAt - Date.now() > 5 * 60_000) return cached.token;

	const { id } = await github<{ id: number }>(`/repos/${REPO_OWNER}/${REPO_NAME}/installation`);
	const { token, expires_at } = await github<{ token: string; expires_at: string }>(
		`/app/installations/${id}/access_tokens`,
		{
			method: 'POST',
			body: JSON.stringify({ repositories: [REPO_NAME], permissions: { contents: 'write' } })
		}
	);

	cached = { token, expiresAt: Date.parse(expires_at) };
	return token;
}
