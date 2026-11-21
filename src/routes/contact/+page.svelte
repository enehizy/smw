<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/data.ts';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Modal from '#lib/components/Modal.svelte';
	import EmailForm from '#lib/components/EmailForm.svelte';
	import CallCard from '#lib/components/CallCard.svelte';

	const presetSubject = page.url.searchParams.get('subject') ?? '';
	let emailOpen = $state(false);
	let callOpen = $state(false);

	$effect(() => {
		if (presetSubject) emailOpen = true;
	});
</script>

<svelte:head>
	<title>Contact — Slesh Music Worldwide</title>
	<meta name="description" content="Reach out. We’d love to hear from you." />
</svelte:head>

<PageHeading title="Contact" subtitle="Reach out. We’d love to hear from you." />

<section class="section">
	<div class="options">
		<button class="option" type="button" aria-haspopup="dialog" onclick={() => (emailOpen = true)}>
			<span class="icon"><Icon name="email" /></span>
			<span class="text">
				<span class="title-md">Send an E-mail</span>
				<span class="caption">Our team will respond shortly</span>
			</span>
		</button>

		<button class="option" type="button" aria-haspopup="dialog" onclick={() => (callOpen = true)}>
			<span class="icon"><Icon name="call" /></span>
			<span class="text">
				<span class="title-md">Give us a call</span>
			</span>
		</button>

		<div class="option static">
			<span class="icon"><Icon name="location" /></span>
			<span class="text">
				<span class="title-md">Visit Our HQ</span>
				<span class="caption">{site.address}</span>
			</span>
		</div>
	</div>
</section>

<Modal bind:open={emailOpen} label="Send an e-mail">
	<EmailForm idPrefix="contact-email" subject={presetSubject} />
</Modal>

<Modal bind:open={callOpen} label="Give us a call" width={480}>
	<CallCard />
</Modal>

<style>
	.section {
		padding-block: 48px;
		min-height: 560px;
	}

	.options {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		align-items: start;
		gap: 24px;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 16px;
		min-height: 130px;
		padding: 24px;
		border: 0;
		border-radius: var(--radius);
		background: var(--blush);
		text-align: left;
		cursor: pointer;
		transition:
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}

	button.option:hover {
		box-shadow: 0 8px 24px rgb(148 21 37 / 0.12);
		transform: translateY(-2px);
	}

	.option.static {
		cursor: default;
	}

	.icon {
		display: grid;
		place-items: center;
		width: 26px;
		flex: none;
		color: var(--red);
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	@media (max-width: 1024px) {
		.options {
			grid-template-columns: 1fr;
		}

		.option {
			min-height: 104px;
		}
	}
</style>
