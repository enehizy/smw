<script lang="ts">
	let scrollY = $state(0);
	let innerHeight = $state(0);

	// Show once the visitor has scrolled past roughly one screen.
	const visible = $derived(innerHeight > 0 && scrollY > innerHeight * 0.8);

	function toTop() {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		document.getElementById('main')?.focus({ preventScroll: true });
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<button
	class="back-to-top"
	class:visible
	type="button"
	aria-label="Back to top"
	title="Back to top"
	tabindex={visible ? 0 : -1}
	aria-hidden={!visible}
	onclick={toTop}
>
	<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
		<path d="M10 16V4M4.5 9.5 10 4l5.5 5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>

<style>
	.back-to-top {
		position: fixed;
		right: clamp(16px, 3vw, 32px);
		bottom: clamp(16px, 3vw, 32px);
		z-index: 40;
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: var(--red);
		color: var(--on-accent);
		box-shadow: 0 8px 24px rgb(0 0 0 / 0.25);
		cursor: pointer;
		opacity: 0;
		transform: translateY(12px);
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease,
			background-color 0.15s ease;
	}

	.back-to-top.visible {
		opacity: 1;
		transform: none;
		pointer-events: auto;
	}

	.back-to-top:hover {
		background: var(--red-dark);
	}
</style>
