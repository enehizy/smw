<script lang="ts">
	import { videos } from '../data.ts';
	import Icon from './Icon.svelte';
</script>

<div class="grid">
	{#each videos as video, i (i)}
		<article class="video">
			<button class="thumb" type="button" aria-label="Play {video.title}" disabled title="Video coming soon">
				<span class="play"><Icon name="play" /></span>
			</button>
			<div class="meta">
				<h3 class="card-title">{video.title}</h3>
				<p class="card-text">{video.artists}</p>
			</div>
		</article>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}

	.video {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.thumb {
		display: grid;
		place-items: center;
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 0;
		border-radius: var(--radius);
		background: #d9d9d9;
		color: var(--black);
		cursor: not-allowed;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-inline: 8px;
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
