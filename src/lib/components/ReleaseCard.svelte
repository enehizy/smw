<script lang="ts">
	import { platforms, type Release } from '../content.ts';
	import Modal from './Modal.svelte';

	let { release }: { release: Release } = $props();

	const available = $derived(platforms.filter((p) => release.links[p.key]));
	let open = $state(false);
</script>

{#snippet card()}
	<img src={release.cover} alt="Cover art for {release.title}" loading="lazy" width="292" height="298" />
	<span class="meta">
		<span class="card-title">{release.title}</span>
		<span class="card-text" title={release.artists}>{release.artists}</span>
	</span>
{/snippet}

<article class="release">
	{#if available.length}
		<button class="hit" type="button" aria-haspopup="dialog" aria-label="Listen to {release.title}" onclick={() => (open = true)}>
			{@render card()}
		</button>
	{:else}
		<div class="hit static">{@render card()}</div>
	{/if}
</article>

{#if available.length}
	<Modal bind:open label="Listen to {release.title}" width={420}>
		<div class="listen">
			<img src={release.cover} alt="" width="96" height="96" />
			<p class="title-md">{release.title}</p>
			<p class="card-text">{release.artists}</p>
			<ul>
				{#each available as p (p.key)}
					<li>
						<a class="platform" href={release.links[p.key]} target="_blank" rel="noopener noreferrer">
							{p.label}<span aria-hidden="true">↗</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Modal>
{/if}

<style>
	.release {
		min-width: 0;
	}

	.hit {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		padding: 0;
		border: 0;
		background: none;
		text-align: left;
		cursor: pointer;
	}

	.hit.static {
		cursor: default;
	}

	img {
		width: 100%;
		aspect-ratio: 292 / 298;
		object-fit: cover;
		border-radius: var(--radius);
		background: var(--paper);
		transition: transform 0.2s ease;
	}

	button.hit:hover img {
		transform: translateY(-3px);
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		padding-inline: 8px;
	}

	.meta .card-text {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.listen {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 32px 24px 24px;
		border-radius: 25px;
		background: var(--blush);
		text-align: center;
	}

	.listen img {
		width: 96px;
		height: 96px;
		margin-bottom: 12px;
	}

	.listen ul {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
	}

	.platform {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 52px;
		padding: 12px 16px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		font-family: var(--font-heading);
		font-weight: 500;
		color: var(--ink);
		transition:
			border-color 0.15s ease,
			color 0.15s ease;
	}

	.platform:hover {
		border-color: var(--red);
		color: var(--red-text);
	}
</style>
