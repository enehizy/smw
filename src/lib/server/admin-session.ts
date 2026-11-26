import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { ADMIN_PASSWORD, GITHUB_APP_PRIVATE_KEY } from '$app/env/private';

// Editors sign in to /admin with ADMIN_PASSWORD and get a signed, httpOnly session cookie.
// The signature key is derived from the password, so changing ADMIN_PASSWORD signs everyone out.

const COOKIE = 'smw_admin';
const MAX_AGE = 60 * 60 * 12; // 12 hours

function signingKey() {
	return `${ADMIN_PASSWORD}\0${GITHUB_APP_PRIVATE_KEY ?? ''}`;
}

function sign(value: string) {
	return createHmac('sha256', signingKey()).update(value).digest('base64url');
}

function safeEqual(a: string, b: string) {
	// Compare fixed-length digests so neither the content nor the length leaks through timing.
	const ha = createHmac('sha256', 'cmp').update(a).digest();
	const hb = createHmac('sha256', 'cmp').update(b).digest();
	return timingSafeEqual(ha, hb);
}

export function checkPassword(input: string) {
	return !!ADMIN_PASSWORD && safeEqual(input, ADMIN_PASSWORD);
}

export function startSession(cookies: Cookies) {
	const expires = String(Math.floor(Date.now() / 1000) + MAX_AGE);
	cookies.set(COOKIE, `${expires}.${sign(expires)}`, {
		path: '/admin',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: MAX_AGE
	});
}

export function endSession(cookies: Cookies) {
	cookies.delete(COOKIE, { path: '/admin' });
}

export function hasSession(cookies: Cookies) {
	if (!ADMIN_PASSWORD) return false;
	const [expires, signature] = (cookies.get(COOKIE) ?? '').split('.');
	if (!expires || !signature) return false;
	if (Number(expires) * 1000 < Date.now()) return false;
	return safeEqual(signature, sign(expires));
}
