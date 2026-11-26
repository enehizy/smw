<script lang="ts">
	import PageHeading from '#lib/components/PageHeading.svelte';
	import VideoGrid from '#lib/components/VideoGrid.svelte';
</script>

<svelte:head>
	<title>Videos — Slesh Music Worldwide</title>
	<meta name="description" content="Music videos from Slesh Music Worldwide artists." />
</svelte:head>

<PageHeading title="Videos" subtitle="Watch the latest from our artists." />

<section class="section" aria-label="All videos">
	<VideoGrid />
</section>
