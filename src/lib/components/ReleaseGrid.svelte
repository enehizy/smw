<script lang="ts">
	import type { Release } from '../data.ts';
	import ReleaseCard from './ReleaseCard.svelte';

	let { releases }: { releases: Release[] } = $props();
</script>

<div class="grid">
	{#each releases as release (release.title)}
		<ReleaseCard {release} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 24px;
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 24px 16px;
		}
	}
</style>
