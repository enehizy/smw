<script lang="ts">
	import { site } from '../data.ts';
	import Icon from './Icon.svelte';
</script>

<footer class="footer">
	<div class="inner">
		<ul class="socials">
			{#each site.socials as s (s.name)}
				<li>
					<a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
						<Icon name={s.icon} />
					</a>
				</li>
			{/each}
		</ul>
		<p class="caption">Slesh Music Worldwide {new Date().getFullYear()}. All Rights Reserved</p>
	</div>
</footer>

<style>
	.footer {
		padding: 24px var(--gutter);
		background: var(--white);
	}

	.inner {
		max-width: var(--content);
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.socials {
		display: flex;
		align-items: center;
		gap: 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.socials a {
		display: grid;
		place-items: center;
		color: rgb(0 0 0 / 0.5);
		transition: color 0.15s ease;
	}

	.socials a:hover {
		color: var(--red);
	}
</style>
