<script lang="ts">
	import { artists, releases } from '#lib/content.ts';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import ReleaseGrid from '#lib/components/ReleaseGrid.svelte';
	import VideoGrid from '#lib/components/VideoGrid.svelte';
	import Icon from '#lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Artists — Slesh Music Worldwide</title>
	<meta name="description" content="Discover the talents behind our sound." />
</svelte:head>

<PageHeading title="Artists" subtitle="Discover the talents behind our sound." />

{#each artists as artist (artist.slug)}
	<section class="profile-wrap" id={artist.slug} aria-label={artist.name}>
		<div class="profile">
			<div class="hero">
				<img src={artist.portrait} alt={artist.name} width="500" height="760" />
				<div class="name-bar">
					<h2>{artist.name.toUpperCase()}</h2>
					{#if artist.socials.length}
						<ul class="socials">
							{#each artist.socials as s (s.name)}
								<li>
									<a href={s.href} target="_blank" rel="noopener noreferrer" aria-label="{artist.name} on {s.name}">
										<Icon name={s.icon} />
									</a>
								</li>
{/each}
					</ul>
				{/if}
			</div>
		</div>
		<!-- Markdown from the CMS, written by trusted editors. -->
		<div class="bio card-text">{@html artist.html}</div>
	</div>
</section>
{/each}

<section class="section stack" aria-labelledby="music-heading">
	<h2 id="music-heading" class="section-heading">Music</h2>
	<ReleaseGrid {releases} />
</section>

<section class="section stack" aria-labelledby="videos-heading">
	<h2 id="videos-heading" class="section-heading">Videos</h2>
	<VideoGrid />
</section>

<style>
	.profile-wrap {
		padding: 32px var(--gutter);
	}

	.profile {
		display: grid;
		grid-template-columns: 500fr 692fr;
		align-items: center;
		gap: 48px;
		max-width: var(--content);
		margin-inline: auto;
	}

	.hero {
		position: relative;
		overflow: hidden;
		aspect-ratio: 500 / 760;
		background: var(--dark);
	}

	.hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.name-bar {
		position: absolute;
		inset: auto 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 24px;
		background: var(--black);
		color: var(--on-dark);
	}

	.name-bar h2 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(36px, 3.9vw, 56px);
		line-height: 1.07;
	}

	.socials {
		display: flex;
		gap: 24px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.socials a {
		display: grid;
		color: var(--on-dark);
		transition: color 0.15s ease;
	}

	.socials a:hover {
		color: var(--red-text);
	}

	.bio {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	@media (max-width: 900px) {
		.profile {
			grid-template-columns: 1fr;
		}

		.hero {
			aspect-ratio: 4 / 5;
			max-width: 520px;
			width: 100%;
			justify-self: center;
		}
	}
</style>
