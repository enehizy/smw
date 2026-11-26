<script lang="ts">
	import { page } from '$app/state';
	import PageHeading from '#lib/components/PageHeading.svelte';

	const notFound = $derived(page.status === 404);
	const title = $derived(notFound ? '404' : String(page.status));
	const subtitle = $derived(
		notFound ? 'This page doesn’t exist.' : 'Something went off-beat.'
	);

	const links = [
		{ label: 'Artists & Music', href: '/artists' },
		{ label: 'Music', href: '/music' },
		{ label: 'Videos', href: '/videos' },
		{ label: 'News & Updates', href: '/news' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Error'} — Slesh Music Worldwide</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<PageHeading {title} {subtitle} />

<section class="section">
	<div class="body">
		<p class="lead">
			{#if notFound}
				The page you’re looking for may have moved, been renamed, or never dropped. Let’s get you
				back to the music.
			{:else}
				{page.error?.message ?? 'An unexpected error occurred.'} Please try again in a moment.
			{/if}
		</p>

		<div class="actions">
			<a class="btn" href="/">Back to Home</a>
			<a class="btn btn-outline" href="/music">Explore Music</a>
		</div>

		{#if notFound}
			<nav aria-labelledby="error-links-heading">
				<h2 id="error-links-heading" class="caption">Or try one of these</h2>
				<ul>
					{#each links as link (link.href)}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</section>

<style>
	.body {
		display: grid;
		gap: 32px;
		padding-block: 24px 40px;
	}

	.lead {
		max-width: 60ch;
		font-size: 18px;
		line-height: 28px;
		color: var(--muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.btn-outline {
		background: transparent;
		border-color: var(--red);
		color: var(--red-text);
	}

	.btn-outline:hover {
		background: var(--blush);
	}

	nav {
		display: grid;
		gap: 12px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 24px;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	ul a {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 18px;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: var(--line-strong);
		text-underline-offset: 4px;
	}

	ul a:hover {
		color: var(--red-text);
		text-decoration-color: currentColor;
	}

	@media (max-width: 600px) {
		.actions .btn {
			flex: 1 1 100%;
		}
	}
</style>
