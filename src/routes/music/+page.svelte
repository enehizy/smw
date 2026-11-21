<script lang="ts">
	import { releases } from '#lib/data.ts';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import ReleaseGrid from '#lib/components/ReleaseGrid.svelte';
	import VideoGrid from '#lib/components/VideoGrid.svelte';
</script>

<svelte:head>
	<title>Music — Slesh Music Worldwide</title>
	<meta name="description" content="Releases and videos from the Slesh Music Worldwide catalogue." />
</svelte:head>

<PageHeading title="Music" subtitle="Discover the talents behind our sound." />

<section class="section stack" aria-labelledby="music-heading">
	<h2 id="music-heading" class="section-heading">Music</h2>
	<ReleaseGrid {releases} />
</section>

<section class="section stack" aria-labelledby="videos-heading">
	<h2 id="videos-heading" class="section-heading">Videos</h2>
	<VideoGrid />
</section>

<style>
	.stack > :global(* + *) {
		margin-top: 24px;
	}
</style>
