<script lang="ts">
	import { page } from '$app/state';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const signedOut = $derived(page.url.searchParams.has('signed_out'));
</script>

<svelte:head>
	<title>Admin sign in — Slesh Music Worldwide</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHeading title="Admin" subtitle="Sign in to manage the site’s content." />

<section class="section">
	<div class="body">
		{#if !data.configured}
			<p class="notice">
				The content manager isn’t set up yet. The site owner needs to add the admin password and
				GitHub App settings to the hosting environment.
			</p>
		{:else}
			{#if signedOut && !form?.error}
				<p class="notice">You’ve been signed out.</p>
			{/if}

			<form method="POST">
				<label for="admin-password">Password</label>
				<input
					id="admin-password"
					class="field"
					class:invalid={form?.error}
					type="password"
					name="password"
					autocomplete="current-password"
					required
					aria-invalid={!!form?.error}
					aria-describedby={form?.error ? 'admin-password-error' : undefined}
				/>
				{#if form?.error}<p id="admin-password-error" class="field-error">{form.error}</p>{/if}
				<button class="btn" type="submit">Sign in</button>
			</form>
		{/if}
	</div>
</section>

<style>
	.body {
		padding-block: 24px 40px;
	}

	form {
		max-width: 440px;
		display: grid;
		gap: 8px;
	}

	label {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 16px;
		color: var(--ink);
	}

	.btn {
		margin-top: 16px;
		justify-self: start;
	}

	.notice {
		margin-bottom: 24px;
		font-size: 18px;
		line-height: 28px;
		color: var(--muted);
	}
</style>
