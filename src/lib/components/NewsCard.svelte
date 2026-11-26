<script lang="ts">
	import { formatDate, type NewsItem } from '../content.ts';

	let { item, showDate = false }: { item: NewsItem; showDate?: boolean } = $props();
</script>

<a class="news-card" href="/news/{item.slug}">
	<img src={item.image} alt="" width="65" height="65" loading="lazy" />
	<div class="text">
		{#if showDate}<time class="caption" datetime={item.date}>{formatDate(item.date)}</time>{/if}
		<h3 class="card-title">{item.title}</h3>
		<p class="card-text">{item.summary}</p>
	</div>
</a>

<style>
	.news-card {
		display: flex;
		align-items: center;
		gap: 16px;
		height: 100%;
		padding: 24px;
		border-radius: var(--radius);
		background: var(--blush);
		transition:
			box-shadow 0.15s ease,
			transform 0.15s ease;
	}

	.news-card:hover {
		box-shadow: 0 8px 24px rgb(148 21 37 / 0.12);
		transform: translateY(-2px);
	}

	.news-card:hover .card-title {
		color: var(--red-text);
	}

	img {
		width: 65px;
		height: 65px;
		flex: none;
		border-radius: 5px;
		object-fit: cover;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	@media (max-width: 600px) {
		.news-card {
			padding: 16px;
		}
	}
</style>
