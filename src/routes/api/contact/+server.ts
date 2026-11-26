import { error, json } from '@sveltejs/kit';
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from '$app/env/private';
import { Resend } from 'resend';
import { subjects } from '#lib/data.ts';
import type { RequestHandler } from './$types';

// Opt out of prerendering: this route must run on the server for every request.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export const POST: RequestHandler = async ({ request }) => {
	if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
		console.error('Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.');
		error(500, 'E-mail is not configured yet.');
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		error(400, 'Invalid request.');
	}

	const str = (key: string, max: number) => String(body[key] ?? '').trim().slice(0, max);
	const name = str('name', 200);
	const email = str('email', 320);
	const subject = str('subject', 100);
	const message = str('message', 5000);

	// Honeypot: real visitors never see or fill this field. Pretend success so bots don't retry.
	if (str('website', 200)) return json({ ok: true });

	if (!name || !EMAIL_RE.test(email) || !subjects.includes(subject) || message.length < 5) {
		error(400, 'Please check the form and try again.');
	}

	const resend = new Resend(RESEND_API_KEY);
	const { error: sendError } = await resend.emails.send({
		// Until the label's domain is verified in Resend, only the onboarding sender works.
		from: CONTACT_FROM_EMAIL || 'SMW Website <onboarding@resend.dev>',
		to: CONTACT_TO_EMAIL,
		replyTo: email,
		subject: `Website enquiry: ${subject} — ${name}`,
		text: `Name: ${name}\nE-mail: ${email}\nSubject: ${subject}\n\n${message}`,
		html: `
			<p><strong>Name:</strong> ${escapeHtml(name)}<br />
			<strong>E-mail:</strong> ${escapeHtml(email)}<br />
			<strong>Subject:</strong> ${escapeHtml(subject)}</p>
			<p style="white-space: pre-wrap">${escapeHtml(message)}</p>
		`
	});

	if (sendError) {
		console.error('Contact form: Resend error', sendError);
		error(502, 'Your message could not be sent. Please try again later.');
	}

	return json({ ok: true });
};
