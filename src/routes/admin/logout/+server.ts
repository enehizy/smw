import { redirect } from '@sveltejs/kit';
import { endSession } from '#lib/server/admin-session.ts';
import type { RequestHandler } from './$types';

export const prerender = false;

const signOut: RequestHandler = ({ cookies }) => {
	endSession(cookies);
	redirect(303, '/admin/login?signed_out');
};

export const GET = signOut;
export const POST = signOut;
