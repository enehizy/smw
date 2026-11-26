<script lang="ts">
	import { intro, mission, services, team, vision } from '#lib/data.ts';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import Icon from '#lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>About Us — Slesh Music Worldwide</title>
	<meta name="description" content="Know who we are, what we do, and the vision driving SMW." />
</svelte:head>

<PageHeading title="About" subtitle="Know who we are, what we do, and the vision driving SMW." />

<div class="section content">
	<p class="intro card-text">{intro}</p>

	<div class="mv">
		<div class="mv-block mission">
			<h2>Our Mission</h2>
			<p>{mission}</p>
		</div>
		<span class="mv-divider" aria-hidden="true"></span>
		<div class="mv-block vision">
			<h2>Our Vision</h2>
			<p>{vision}</p>
		</div>
	</div>

	<section aria-labelledby="services-heading">
		<h2 id="services-heading" class="section-heading">Services We Offer</h2>
		<ul class="services">
			{#each services as s (s.slug)}
				<li>
					<a class="service" href="/services/{s.slug}">
						<span class="svc-icon"><Icon name={s.icon} /></span>
						<span class="card-title">{s.title}</span>
						<span class="arrow"><Icon name="arrow" /></span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="team-heading">
		<h2 id="team-heading" class="section-heading">Meet Our Team</h2>
		<div class="team">
			<figure class="member founder">
				<img src={team.founder.image} alt={team.founder.name} loading="lazy" />
				<figcaption>
					<span class="card-title">{team.founder.name}</span>
					<span class="card-text">{team.founder.role}</span>
				</figcaption>
			</figure>
			{#each team.members as m, i (i)}
				<figure class="member">
					<img src={m.image} alt={m.name} loading="lazy" />
					<figcaption>
						<span class="card-title">{m.name}</span>
						<span class="card-text">{m.role}</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</section>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 80px;
	}

	.content > :global(*) {
		width: 100%;
	}

	.intro {
		max-width: 930px;
		text-align: center;
	}

	/* Mission & vision */
	.mv {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: start;
		background: var(--red-dark);
		color: var(--on-accent);
	}

	.mv-block {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px 24px 32px;
		text-align: center;
	}

	.mv-block h2 {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: -0.01em;
	}

	.mv-block p {
		max-width: 420px;
	}

	.mission p {
		margin-left: auto;
		text-align: right;
	}

	.vision p {
		text-align: left;
	}

	.mv-divider {
		align-self: center;
		width: 1px;
		height: 34px;
		background: var(--blush);
		opacity: 0.7;
	}

	/* Services */
	.services {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		margin: 24px 0 0;
		padding: 0;
		list-style: none;
	}

	.service {
		display: flex;
		align-items: center;
		gap: 16px;
		min-height: 96px;
		height: 100%;
		padding: 16px 24px;
		border-radius: var(--radius);
		background: var(--blush);
		transition:
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}

	.service:hover {
		box-shadow: 0 8px 24px rgb(148 21 37 / 0.12);
		transform: translateY(-2px);
	}

	.svc-icon {
		display: grid;
		place-items: center;
		width: 52px;
		flex: none;
		color: var(--red-text);
	}

	.service .card-title {
		flex: 1;
	}

	.arrow {
		display: grid;
		flex: none;
		color: var(--ink);
	}

	/* Team */
	.team {
		display: grid;
		grid-template-columns: 2fr 1.5fr 1.5fr;
		grid-template-rows: 200px 200px;
		margin-top: 24px;
		border: 1px solid var(--muted);
	}

	.member {
		position: relative;
		margin: 0;
		overflow: hidden;
		outline: 1px solid var(--muted);
	}

	.founder {
		grid-row: span 2;
	}

	.member img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	figcaption {
		position: absolute;
		left: 12px;
		bottom: 12px;
		display: flex;
		flex-direction: column;
		padding: 4px 8px;
		border-radius: 5px;
		background: rgb(var(--bg-rgb) / 0.7);
		backdrop-filter: blur(4px);
	}

	@media (max-width: 1024px) {
		.services {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 900px) {
		.content {
			gap: 56px;
		}

		.mv {
			grid-template-columns: 1fr;
		}

		.mv-divider {
			width: 34px;
			height: 1px;
			justify-self: center;
		}

		.mission p,
		.vision p {
			margin-inline: auto;
			text-align: center;
		}

		.team {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 320px 200px 200px;
		}

		.founder {
			grid-row: auto;
			grid-column: span 2;
		}
	}

	@media (max-width: 600px) {
		.content {
			gap: 40px;
		}

		.intro {
			text-align: left;
		}

		.team {
			grid-template-rows: 280px 170px 170px;
		}
	}
</style>
