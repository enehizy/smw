<script lang="ts">
	import SuccessState from '#lib/components/SuccessState.svelte';

	let email = $state('');
	let error = $state('');
	let done = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid e-mail address.';
			return;
		}
		error = '';
		// TODO: connect to a mailing-list provider.
		done = true;
	}
</script>

<svelte:head>
	<title>Shop — Slesh Music Worldwide</title>
	<meta name="description" content="The LOVE WORLD merch collection is coming soon." />
</svelte:head>

<section class="launch">
	<div class="inner">
		<div class="announce">
			<h1>LOVE<br />WORLD</h1>
			<p class="type">merch collection</p>
			<p class="soon">COMING SOON!</p>
		</div>

		<div class="notify">
			{#if done}
				<SuccessState title="Thank You!" message="We will keep you updated." />
			{:else}
				<form novalidate onsubmit={submit}>
					<p class="caption">The LOVE WORLD merch collection is on its way.</p>
					<h2 class="title-md">Get notified when we launch</h2>
					<label class="visually-hidden" for="notify-email">E-mail address</label>
					<input
						id="notify-email"
						class="field"
						class:invalid={error}
						type="email"
						autocomplete="email"
						placeholder="Enter e-mail address"
						bind:value={email}
						aria-invalid={!!error}
					/>
					{#if error}<p class="field-error">{error}</p>{/if}
					<button class="btn" type="submit">Submit</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.launch {
		background: var(--placeholder);
		padding: 72px var(--gutter);
	}

	.inner {
		display: grid;
		grid-template-columns: 620fr 556fr;
		align-items: center;
		gap: 64px;
		max-width: var(--content);
		min-height: 680px;
		margin-inline: auto;
	}

	.announce {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		text-align: center;
	}

	h1 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(56px, 5.6vw, 80px);
		line-height: 1.05;
		color: var(--ink);
	}

	.type {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 25px;
		line-height: 32px;
		color: var(--muted);
	}

	.soon {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 28px;
		line-height: 44px;
		letter-spacing: 0.02em;
	}

	.notify {
		border: 1px solid var(--ink);
		border-radius: 25px;
		background: var(--paper);
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 32px;
		text-align: center;
	}

	form .field {
		background: rgb(var(--bg-rgb) / 0.5);
	}

	.notify :global(.success) {
		min-height: 266px;
	}

	@media (max-width: 900px) {
		.inner {
			grid-template-columns: 1fr;
			gap: 40px;
			min-height: 0;
		}
	}

	@media (max-width: 600px) {
		.launch {
			padding-block: 48px;
		}

		form {
			padding: 24px 20px;
		}

		form .btn {
			align-self: stretch;
		}

		.type {
			font-size: 20px;
		}

		.soon {
			font-size: 22px;
		}
	}
</style>
