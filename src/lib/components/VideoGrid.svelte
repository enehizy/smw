<script lang="ts">
	import { videos, type Video } from '../content.ts';
	import Icon from './Icon.svelte';
	import Modal from './Modal.svelte';

	let playing = $state<Video | null>(null);
	let open = $state(false);

	function play(video: Video) {
		playing = video;
		open = true;
	}
</script>

{#if videos.length}
	<div class="grid">
		{#each videos as video (video.slug)}
			<article class="video">
				<button class="thumb" type="button" aria-label="Play {video.title}" onclick={() => play(video)}>
					<img src="https://i.ytimg.com/vi/{video.youtubeId}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360" />
					<span class="play"><Icon name="play" /></span>
				</button>
				<div class="meta">
					<h3 class="card-title">{video.title}</h3>
					<p class="card-text">{video.artists}</p>
				</div>
			</article>
		{/each}
	</div>
{:else}
	<p class="empty card-text">New videos are on the way.</p>
{/if}

<Modal bind:open label={playing ? `Video: ${playing.title}` : 'Video'} width={960}>
	{#if playing}
		<div class="player">
			<iframe
				src="https://www.youtube-nocookie.com/embed/{playing.youtubeId}?autoplay=1&rel=0"
				title="{playing.title} — {playing.artists}"
				allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</Modal>

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
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		aspect-ratio: 16 / 9;
		padding: 0;
		overflow: hidden;
		border: 0;
		border-radius: var(--radius);
		background: var(--placeholder);
		cursor: pointer;
	}

	.thumb img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.play {
		position: relative;
		display: grid;
		color: #fff;
		filter: drop-shadow(0 2px 8px rgb(0 0 0 / 0.5));
		transition: transform 0.2s ease;
	}

	.thumb:hover img {
		transform: scale(1.04);
	}

	.thumb:hover .play {
		transform: scale(1.1);
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-inline: 8px;
	}

	.empty {
		padding: 32px;
		border-radius: var(--radius);
		background: var(--blush);
		text-align: center;
	}

	.player {
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: var(--radius);
		background: #000;
	}

	.player iframe {
		width: 100%;
		height: 100%;
		border: 0;
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
