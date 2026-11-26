import { defineEnvVars } from '@sveltejs/kit/env';

// Server-only settings for the contact form (see .env.example).
// All optional so the site still starts without them; the contact endpoint reports what's missing.
const optional = (value: string | undefined) => value?.trim() || undefined;

export const variables = defineEnvVars({
	RESEND_API_KEY: {
		schema: optional,
		description: 'Resend API key used to send contact-form e-mails.'
	},
	CONTACT_TO_EMAIL: {
		schema: optional,
		description: 'Address that receives contact-form messages.'
	},
	CONTACT_FROM_EMAIL: {
		schema: optional,
		description: 'Sender for contact-form e-mails. Defaults to Resend’s onboarding sender.'
	}
});
