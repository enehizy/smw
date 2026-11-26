<script lang="ts">
	import { formatDate, news } from '#lib/content.ts';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const article = $derived(data.article);
	const more = $derived(news.filter((n) => n.slug !== article.slug).slice(0, 3));
</script>

<svelte:head>
	<title>{article.title} — Slesh Music Worldwide</title>
	<meta name="description" content={article.summary} />
</svelte:head>

<PageHeading title="News & Updates" subtitle={article.title} />

<article class="section">
	<div class="article">
		<a class="back" href="/news">← All news</a>

		<header class="head">
			<img src={article.image} alt="" width="160" height="160" />
			<div>
				<time class="caption" datetime={article.date}>{formatDate(article.date)}</time>
				<h2 class="title">{article.title}</h2>
				<p class="lede">{article.summary}</p>
			</div>
		</header>

		<!-- Markdown from the CMS, written by trusted editors. -->
		<div class="body">{@html article.html}</div>
	</div>
</article>

{#if more.length}
	<section class="section stack" aria-labelledby="more-heading">
		<h2 id="more-heading" class="section-heading">More News</h2>
		<ul class="more">
			{#each more as item (item.slug)}
				<li><NewsCard {item} /></li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	.article {
		display: flex;
		flex-direction: column;
		gap: 32px;
		max-width: 820px;
		padding-top: 16px;
	}

	.back {
		align-self: flex-start;
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 16px;
		color: var(--red-text);
	}

	.back:hover {
		text-decoration: underline;
	}

	.head {
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.head img {
		width: 160px;
		height: 160px;
		flex: none;
		border-radius: var(--radius);
		object-fit: cover;
	}

	.head div {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(32px, 4vw, 48px);
		line-height: 1.1;
		letter-spacing: 0.01em;
		color: var(--ink);
	}

	.lede {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 20px;
		line-height: 28px;
		color: var(--muted);
	}

	.body {
		color: var(--ink);
	}

	.body :global(:where(p, ul, ol, blockquote, h2, h3, figure)) {
		margin: 0 0 20px;
	}

	.body :global(h2),
	.body :global(h3) {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		margin-top: 32px;
	}

	.body :global(a) {
		color: var(--red-text);
		text-decoration: underline;
	}

	.body :global(img) {
		height: auto;
		border-radius: var(--radius);
	}

	.body :global(blockquote) {
		padding-left: 20px;
		border-left: 3px solid var(--red);
		color: var(--muted);
	}

	.more {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		margin-block: 0;
		padding: 0;
		list-style: none;
	}

	@media (max-width: 1024px) {
		.more {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.head {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		.head img {
			width: 120px;
			height: 120px;
		}

		.lede {
			font-size: 17px;
			line-height: 24px;
		}
	}
</style>
