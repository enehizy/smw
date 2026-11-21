<script lang="ts">
	import Icon from './Icon.svelte';
	import SubjectSelect from './SubjectSelect.svelte';
	import SuccessState from './SuccessState.svelte';

	let { subject: initialSubject = '', idPrefix = 'email' }: { subject?: string; idPrefix?: string } =
		$props();

	let name = $state('');
	let email = $state('');
	// Seeded once from the prop; the user can change it afterwards.
	// svelte-ignore state_referenced_locally
	let subject = $state(initialSubject);
	let message = $state('');
	let errors = $state<Record<string, string>>({});
	let sending = $state(false);
	let sent = $state(false);

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
		// TODO: connect to an e-mail service or API endpoint.
		await new Promise((r) => setTimeout(r, 600));
		sending = false;
		sent = true;
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

			<button class="btn send" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send'}</button>
		</form>
	{/if}
</div>

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
		color: var(--red);
	}

	.message {
		display: block;
		min-height: 206px;
		resize: vertical;
	}

	.send {
		align-self: center;
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
