<script lang="ts">
	import { news } from '#lib/content.ts';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
</script>

<svelte:head>
	<title>News &amp; Updates — Slesh Music Worldwide</title>
	<meta name="description" content="The latest releases, features and milestones from Slesh Music Worldwide." />
</svelte:head>

<PageHeading title="News & Updates" subtitle="The latest from SMW." />

<section class="section" aria-label="All news">
	<ul class="list">
		{#each news as item (item.slug)}
			<li><NewsCard {item} showDate /></li>
		{/each}
	</ul>
</section>

<style>
	.list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		margin-block: 0;
		margin-inline: auto;
		padding: 0;
		list-style: none;
	}

	@media (max-width: 1024px) {
		.list {
			grid-template-columns: 1fr;
		}
	}
</style>
