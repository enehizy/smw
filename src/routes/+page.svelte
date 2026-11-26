<script lang="ts">
	import { featuredArtists, intro } from '#lib/data.ts';
	import { news, releases } from '#lib/content.ts';
	import ReleaseGrid from '#lib/components/ReleaseGrid.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import EmailForm from '#lib/components/EmailForm.svelte';
	import CallCard from '#lib/components/CallCard.svelte';

	let track: HTMLUListElement | undefined = $state();
	let index = $state(0);
	const last = featuredArtists.length - 1;

	function go(to: number) {
		if (!track) return;
		index = Math.max(0, Math.min(last, to));
		const slide = track.children[index] as HTMLElement;
		track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
	}

	// Keep the buttons in sync when the visitor swipes instead of clicking.
	function onScroll() {
		if (!track) return;
		index = Math.round(track.scrollLeft / track.clientWidth);
	}
</script>

<svelte:head>
	<title>Slesh Music Worldwide — More Than Music</title>
	<meta
		name="description"
		content="Discover the music, artists, and culture shaping the next wave of African entertainment."
	/>
</svelte:head>

<section class="hero">
	<div class="hero-inner">
		<img class="hero-logo" src="/images/logo.webp" alt="Slesh Music Worldwide logo" width="380" height="380" />
		<div class="hero-content">
			<h1>More Than Music.<br />A World of Our Own.</h1>
			<p>Discover the music, artists, and culture shaping the next wave of African entertainment.</p>
			<a class="btn" href="/music">Explore Music</a>
		</div>
	</div>
</section>

<section class="section stack" aria-labelledby="artists-heading" aria-roledescription="carousel">
	<h2 id="artists-heading" class="section-heading">Artists</h2>
	<div class="slider">
		<button type="button" class="slide-btn prev" aria-label="Previous artist" disabled={index === 0} onclick={() => go(index - 1)}>
			<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
		</button>
		<ul class="artist-track" bind:this={track} onscroll={onScroll}>
			{#each featuredArtists as a, i (a.name)}
				<li aria-roledescription="slide" aria-label="{i + 1} of {featuredArtists.length}">
					<a class="artist-card" href={a.href} tabindex={i === index ? 0 : -1}>
						<img src={a.image} alt={a.name} loading="lazy" />
						<span class="artist-name">{a.name.toUpperCase()}</span>
					</a>
				</li>
			{/each}
		</ul>
		<button type="button" class="slide-btn next" aria-label="Next artist" disabled={index === last} onclick={() => go(index + 1)}>
			<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
		</button>
	</div>
</section>

<section class="section stack" aria-labelledby="music-heading">
	<div class="row">
		<h2 id="music-heading" class="section-heading">Latest Music</h2>
		<a class="link" href="/music">View all</a>
	</div>
	<ReleaseGrid releases={releases.slice(0, 4)} />
</section>

<section class="section stack about" aria-labelledby="about-heading">
	<h2 id="about-heading" class="section-heading">About Us</h2>
	<div class="about-card">
		<p class="card-text about-copy">{intro}</p>
		<a class="btn" href="/about">Discover more</a>
	</div>
</section>

<section class="section stack" aria-labelledby="news-heading">
	<div class="row">
		<h2 id="news-heading" class="section-heading">News &amp; Updates</h2>
		<a class="link" href="/news">See more</a>
	</div>
	<ul class="news">
		{#each news.slice(0, 3) as item (item.slug)}
			<li><NewsCard {item} /></li>
		{/each}
	</ul>
</section>

<a class="merch" href="/shop" aria-label="Love World merch collection — coming soon. Visit the shop.">
	<img src="/images/merch-teaser.webp" alt="" loading="lazy" />
</a>

<section class="section stack" aria-labelledby="contact-heading">
	<h2 id="contact-heading" class="section-heading">Get In Touch</h2>
	<div class="contact">
		<EmailForm idPrefix="home-email" />
		<CallCard />
	</div>
</section>

<style>
	/* Hero */
	.hero {
		background: var(--dark);
		color: var(--on-dark);
		padding: 80px var(--gutter);
	}

	.hero-inner {
		display: flex;
		align-items: center;
		gap: 64px;
		max-width: var(--content);
		min-height: 560px;
		margin-inline: auto;
	}

	.hero-logo {
		width: clamp(180px, 26vw, 380px);
		height: auto;
		flex: none;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 24px;
	}

	h1 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(44px, 5.6vw, 80px);
		line-height: 1.05;
		color: var(--on-dark);
	}

	.hero-content p {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: clamp(16px, 1.75vw, 25px);
		line-height: 1.3;
		letter-spacing: 0;
		max-width: 796px;
	}

	/* Artists slider */
	/* The image spans the full content width so it lines up with its heading;
	   the arrows sit in the side gutters, 24px from the image. */
	.slider {
		position: relative;
	}

	.slide-btn {
		position: absolute;
		top: 50%;
		z-index: 1;
		transform: translateY(-50%);
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 1px solid var(--red);
		border-radius: 50%;
		background: transparent;
		color: var(--red-text);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease,
			opacity 0.15s ease;
	}

	.slide-btn.prev {
		left: -68px;
	}

	.slide-btn.next {
		right: -68px;
	}

	.slide-btn:hover:not(:disabled) {
		background: var(--red);
		color: var(--on-accent);
	}

	.slide-btn:disabled {
		opacity: 0.35;
		cursor: default;
	}

	.artist-track {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		border-radius: 32px;
	}

	.artist-track::-webkit-scrollbar {
		display: none;
	}

	.artist-track li {
		flex: 0 0 100%;
		scroll-snap-align: start;
	}

	/* Artist card */
	.artist-card {
		position: relative;
		display: block;
		overflow: hidden;
		border-radius: 32px;
		aspect-ratio: 1240 / 582;
		background: var(--dark);
	}

	.artist-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.artist-card:hover img {
		transform: scale(1.03);
	}

	.artist-name {
		position: absolute;
		left: 8%;
		bottom: 8%;
		font-family: var(--font-display);
		font-size: clamp(28px, 4.8vw, 70px);
		line-height: 1.4;
		letter-spacing: 0.04em;
		color: var(--on-dark);
		text-shadow: 0 4px 24px rgb(0 0 0 / 0.45);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.link {
		padding: 4px 8px;
		border-radius: var(--radius);
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 20px;
		line-height: 28px;
		color: var(--red-text);
	}

	.link:hover {
		background: var(--blush);
	}

	/* About */
	/* Black band covers the whole section so heading-to-card spacing matches every other section. */
	.about {
		background: var(--black);
	}

	.about .section-heading {
		color: var(--on-dark);
	}

	.about-card {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 48px;
		max-width: var(--content);
		margin-inline: auto;
		padding: 56px 88px;
		border-radius: var(--radius);
		background: var(--blush);
	}

	.about-copy {
		flex: 0 1 817px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.about-card .btn {
		flex: none;
	}

	/* News */
	.news {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		margin-block: 0; /* not `margin: 0`, which would cancel the section's centring */
		padding: 0;
		list-style: none;
	}

	/* Merch */
	.merch {
		display: block;
		background: var(--black);
	}

	.merch img {
		width: 100%;
		height: auto;
		max-height: 520px;
		aspect-ratio: 1298 / 680;
		object-fit: contain;
		margin-inline: auto;
	}

	/* Contact */
	.contact {
		display: grid;
		grid-template-columns: 760fr 456fr;
		align-items: start;
		gap: 24px;
	}

	/* Gutters get too narrow for outside arrows: overlay them on the image edges. */
	@media (max-width: 1180px) {
		.slide-btn {
			width: 40px;
			height: 40px;
			border-color: transparent;
			background: rgb(0 0 0 / 0.45);
			color: #fff;
		}

		.slide-btn.prev {
			left: 12px;
		}

		.slide-btn.next {
			right: 12px;
		}
	}

	@media (max-width: 1024px) {
		.news {
			grid-template-columns: 1fr;
		}

		.contact {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 900px) {
		.hero-inner {
			position: relative;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			gap: 32px;
			min-height: 0;
		}

		.hero-content {
			align-items: center;
		}

		.about-card {
			padding: 32px;
		}
	}

	@media (max-width: 600px) {
		.hero {
			padding-block: 56px;
		}

		.artist-card {
			aspect-ratio: 16 / 10;
			border-radius: 16px;
		}

		.link {
			font-size: 16px;
		}

		.about-card {
			flex-direction: column;
			align-items: center;
			padding: 24px 20px;
			gap: 24px;
		}

		.about-copy {
			flex: none;
			-webkit-line-clamp: 5;
			line-clamp: 5;
		}

		.artist-track {
			border-radius: 16px;
		}
	}
</style>
