<script lang="ts">
	let { title, subtitle }: { title: string; subtitle: string } = $props();
</script>

<header class="page-heading">
	<div class="inner">
		<h1>{title}</h1>
		<span class="divider" aria-hidden="true"></span>
		<p>{subtitle}</p>
	</div>
</header>

<style>
	.page-heading {
		background: var(--blush);
		padding: 20px var(--gutter);
	}

	.inner {
		max-width: var(--content);
		margin-inline: auto;
		display: flex;
		align-items: center;
		gap: 24px;
		min-height: 60px;
	}

	h1 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 56px;
		line-height: 60px;
		color: var(--red);
		flex: none;
	}

	.divider {
		align-self: stretch;
		width: 1px;
		margin-block: 4px;
		background: rgb(89 89 89 / 0.25);
		flex: none;
	}

	p {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 28px;
		line-height: 44px;
		letter-spacing: 0.02em;
		color: var(--muted);
	}

	@media (max-width: 900px) {
		h1 {
			font-size: 44px;
			line-height: 48px;
		}

		p {
			font-size: 20px;
			line-height: 30px;
		}
	}

	@media (max-width: 600px) {
		.inner {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}

		.divider {
			display: none;
		}

		h1 {
			font-size: 40px;
			line-height: 44px;
		}

		p {
			font-size: 16px;
			line-height: 24px;
			letter-spacing: 0;
		}
	}
</style>
