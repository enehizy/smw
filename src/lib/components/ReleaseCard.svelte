<script lang="ts">
	import type { Release } from '../data.ts';

	let { release }: { release: Release } = $props();
</script>

<article class="release">
	<img src={release.cover} alt="Cover art for {release.title}" loading="lazy" width="292" height="298" />
	<div class="meta">
		<h3 class="card-title">{release.title}</h3>
		<p class="card-text" title={release.artists}>{release.artists}</p>
	</div>
</article>

<style>
	.release {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 0;
	}

	img {
		width: 100%;
		aspect-ratio: 292 / 298;
		object-fit: cover;
		border-radius: var(--radius);
		background: var(--paper);
		transition: transform 0.2s ease;
	}

	.release:hover img {
		transform: translateY(-3px);
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-inline: 8px;
	}

	p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
