<script lang="ts">
	import Icon from './Icon.svelte';
	import SubjectSelect from './SubjectSelect.svelte';
	import SuccessState from './SuccessState.svelte';
	import Modal from './Modal.svelte';

	let {
		subject: initialSubject = '',
		idPrefix = 'email',
		inModal = false
	}: {
		subject?: string;
		idPrefix?: string;
		/** True when the form already sits inside a Modal: show success in place instead of opening another. */
		inModal?: boolean;
	} = $props();

	let name = $state('');
	let email = $state('');
	// Seeded once from the prop; the user can change it afterwards.
	// svelte-ignore state_referenced_locally
	let subject = $state(initialSubject);
	let message = $state('');
	let website = $state(''); // honeypot
	let errors = $state<Record<string, string>>({});
	let sending = $state(false);
	let sent = $state(false);
	let successOpen = $state(false);
	let sendError = $state('');

	function validate() {
		const e: Record<string, string> = {};
		if (!name.trim()) e.name = 'Please enter your name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Please enter a valid e-mail address.';
		if (!subject) e.subject = 'Please choose a subject.';
		if (message.trim().length < 5) e.message = 'Please type a short message.';
		return e;
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		errors = validate();
		if (Object.keys(errors).length) return;
		sending = true;
		sendError = '';
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name, email, subject, message, website })
			});
			if (!res.ok) {
				const data = await res.json().catch(() => null);
				sendError = data?.message ?? 'Your message could not be sent. Please try again.';
				return;
			}
		} catch {
			sendError = 'Network error. Please check your connection and try again.';
			return;
		} finally {
			sending = false;
		}

		if (inModal) {
			sent = true;
		} else {
			// Clear the inline form and confirm in a modal, like the Contact page.
			name = email = subject = message = '';
			successOpen = true;
		}
	}
</script>

<div class="email-card">
	{#if sent}
		<SuccessState title="E-mail Sent!" message="We will respond to you shortly." />
	{:else}
		<form novalidate onsubmit={submit}>
			<div class="fields">
				<h3 class="heading title-md">
					<span class="icon"><Icon name="email" /></span>
					Send an E-mail
				</h3>

				<div>
					<label class="visually-hidden" for="{idPrefix}-name">Full name</label>
					<input
						id="{idPrefix}-name"
						class="field"
						class:invalid={errors.name}
						placeholder="Full name"
						autocomplete="name"
						bind:value={name}
						aria-invalid={!!errors.name}
					/>
					{#if errors.name}<p class="field-error">{errors.name}</p>{/if}
				</div>

				<div>
					<label class="visually-hidden" for="{idPrefix}-email">E-mail address</label>
					<input
						id="{idPrefix}-email"
						class="field"
						class:invalid={errors.email}
						type="email"
						placeholder="E-mail address"
						autocomplete="email"
						bind:value={email}
						aria-invalid={!!errors.email}
					/>
					{#if errors.email}<p class="field-error">{errors.email}</p>{/if}
				</div>

				<div>
					<label class="visually-hidden" for="{idPrefix}-subject">Subject</label>
					<SubjectSelect id="{idPrefix}-subject" bind:value={subject} invalid={!!errors.subject} />
					{#if errors.subject}<p class="field-error">{errors.subject}</p>{/if}
				</div>

				<div class="hp" aria-hidden="true">
					<label for="{idPrefix}-website">Website</label>
					<input id="{idPrefix}-website" tabindex="-1" autocomplete="off" bind:value={website} />
				</div>

				<div>
					<label class="visually-hidden" for="{idPrefix}-message">Message</label>
					<textarea
						id="{idPrefix}-message"
						class="field message"
						class:invalid={errors.message}
						placeholder="Type your message"
						bind:value={message}
						aria-invalid={!!errors.message}
					></textarea>
					{#if errors.message}<p class="field-error">{errors.message}</p>{/if}
				</div>
			</div>

			{#if sendError}<p class="field-error send-error" role="alert">{sendError}</p>{/if}
			<button class="btn send" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send'}</button>
		</form>
	{/if}
</div>

{#if !inModal}
	<Modal bind:open={successOpen} label="E-mail sent" width={480}>
		<div class="success-card">
			<SuccessState title="E-mail Sent!" message="We will respond to you shortly." />
		</div>
	</Modal>
{/if}

<style>
	.email-card {
		padding: 32px;
		border-radius: var(--radius);
		background: var(--blush);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.heading {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.icon {
		display: grid;
		color: var(--red-text);
	}

	.message {
		display: block;
		min-height: 206px;
		resize: vertical;
	}

	.send {
		align-self: center;
	}

	.send-error {
		margin: -8px 0 0;
		text-align: center;
	}

	.hp {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.success-card {
		border-radius: 25px;
		background: var(--blush);
	}

	@media (max-width: 600px) {
		.email-card {
			padding: 24px 20px;
		}

		.message {
			min-height: 160px;
		}
	}
</style>
