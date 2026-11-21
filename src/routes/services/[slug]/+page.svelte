<script lang="ts">
	import PageHeading from '#lib/components/PageHeading.svelte';
	import { services } from '#lib/data.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const service = $derived(data.service);
</script>

<svelte:head>
	<title>{service.title} — Slesh Music Worldwide</title>
	<meta name="description" content={service.description} />
</svelte:head>

<PageHeading title="Services" subtitle={service.title} />

<section class="section">
	<div class="service">
		<div class="copy">
			<p class="card-text">{service.description}</p>
			<a class="btn" href="/contact?subject={encodeURIComponent(service.subject)}">{service.cta}</a>
			<nav class="others" aria-label="Other services">
				{#each services.filter((s) => s.slug !== service.slug) as s (s.slug)}
					<a href="/services/{s.slug}">{s.title} →</a>
				{/each}
			</nav>
		</div>
		<img src={service.image} alt="" width="692" height="480" />
	</div>
</section>

<style>
	.section {
		padding-block: 64px;
	}

	.service {
		display: grid;
		grid-template-columns: 500fr 692fr;
		align-items: center;
		gap: 48px;
		min-height: 576px;
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 40px;
	}

	.others {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 24px;
		margin-top: -8px;
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 15px;
		color: var(--red);
	}

	.others a:hover {
		text-decoration: underline;
	}

	img {
		width: 100%;
		aspect-ratio: 692 / 480;
		height: auto;
		object-fit: cover;
		border-radius: var(--radius);
	}

	@media (max-width: 900px) {
		.service {
			grid-template-columns: 1fr;
			min-height: 0;
		}

		img {
			order: -1;
		}

		.copy {
			gap: 28px;
		}
	}

	@media (max-width: 600px) {
		.section {
			padding-block: 32px;
		}

		.copy .btn {
			align-self: stretch;
		}
	}
</style>
