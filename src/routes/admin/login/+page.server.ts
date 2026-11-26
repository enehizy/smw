import { fail, redirect } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$app/env/private';
import { checkPassword, hasSession, startSession } from '#lib/server/admin-session.ts';
import { githubAppConfigured } from '#lib/server/github-app.ts';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

// Best-effort brute-force brake: per-IP failure count, kept in memory for this server instance.
const WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 10;
const failures = new Map<string, { count: number; since: number }>();

function tooManyFailures(ip: string) {
	const entry = failures.get(ip);
	if (!entry || Date.now() - entry.since > WINDOW_MS) return false;
	return entry.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
	const entry = failures.get(ip);
	if (!entry || Date.now() - entry.since > WINDOW_MS) failures.set(ip, { count: 1, since: Date.now() });
	else entry.count += 1;
}

export const load: PageServerLoad = ({ cookies }) => {
	if (hasSession(cookies)) redirect(303, '/admin');
	return { configured: !!ADMIN_PASSWORD && githubAppConfigured() };
};

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const ip = getClientAddress();
		if (tooManyFailures(ip)) {
			return fail(429, { error: 'Too many attempts. Please wait 15 minutes and try again.' });
		}

		const password = String((await request.formData()).get('password') ?? '');
		if (!checkPassword(password)) {
			recordFailure(ip);
			await new Promise((resolve) => setTimeout(resolve, 600));
			return fail(400, { error: 'That password is not correct.' });
		}

		failures.delete(ip);
		startSession(cookies);
		redirect(303, '/admin');
	}
};
