<script lang="ts">
	import { intro, news, releases } from '#lib/data.ts';
	import ReleaseGrid from '#lib/components/ReleaseGrid.svelte';
	import EmailForm from '#lib/components/EmailForm.svelte';
	import CallCard from '#lib/components/CallCard.svelte';
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

<section class="section stack" aria-labelledby="artists-heading">
	<h2 id="artists-heading" class="section-heading">Artists</h2>
	<a class="artist-card" href="/artists">
		<img src="/images/big-slesh.webp" alt="Big Slesh" loading="lazy" />
		<span class="artist-name">BIG SLESH</span>
	</a>
</section>

<section class="section stack" aria-labelledby="music-heading">
	<div class="row">
		<h2 id="music-heading" class="section-heading">Latest Music</h2>
		<a class="link" href="/music">View all</a>
	</div>
	<ReleaseGrid releases={releases.slice(0, 4)} />
</section>

<section class="about" aria-labelledby="about-heading">
	<div class="about-heading-wrap">
		<h2 id="about-heading" class="section-heading">About Us</h2>
	</div>
	<div class="about-band">
		<div class="about-card">
			<p class="card-text about-copy">{intro}</p>
			<a class="btn" href="/about">Discover more</a>
		</div>
	</div>
</section>

<section class="section stack" aria-labelledby="news-heading">
	<h2 id="news-heading" class="section-heading">News &amp; Updates</h2>
	<ul class="news">
		{#each news as item (item.title)}
			<li class="news-card">
				<img src={item.image} alt="" width="65" height="65" loading="lazy" />
				<div>
					<h3 class="card-title">{item.title}</h3>
					<p class="card-text">{item.body}</p>
				</div>
			</li>
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
	.stack > :global(* + *) {
		margin-top: 32px;
	}

	/* Hero */
	.hero {
		background: var(--ink);
		color: var(--paper);
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
		color: var(--paper);
	}

	.hero-content p {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: clamp(16px, 1.75vw, 25px);
		line-height: 1.3;
		letter-spacing: 0;
		max-width: 796px;
	}

	/* Artist card */
	.artist-card {
		position: relative;
		display: block;
		overflow: hidden;
		border-radius: 32px;
		aspect-ratio: 1240 / 582;
		background: var(--ink);
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
		color: var(--white);
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
		color: var(--red);
	}

	.link:hover {
		background: var(--blush);
	}

	/* About */
	.about {
		padding-block: 40px;
	}

	.about-heading-wrap {
		padding-inline: var(--gutter);
		margin-bottom: 32px;
	}

	.about-heading-wrap h2 {
		max-width: var(--content);
		margin-inline: auto;
	}

	.about-band {
		padding: 40px var(--gutter);
		background: var(--black);
	}

	.about-card {
		display: flex;
		align-items: center;
		gap: 48px;
		max-width: var(--content);
		margin-inline: auto;
		padding: 56px 32px 56px 74px;
		border-radius: var(--radius);
		background: var(--blush);
	}

	.about-copy {
		flex: 1;
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
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.news-card {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 24px;
		border-radius: var(--radius);
		background: var(--blush);
	}

	.news-card img {
		width: 65px;
		height: 65px;
		flex: none;
		border-radius: 5px;
		object-fit: cover;
	}

	.news-card div {
		display: flex;
		flex-direction: column;
		gap: 4px;
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
			align-items: stretch;
			padding: 24px 20px;
			gap: 24px;
		}

		.about-copy {
			-webkit-line-clamp: 5;
			line-clamp: 5;
		}

		.news-card {
			padding: 16px;
		}
	}
</style>
