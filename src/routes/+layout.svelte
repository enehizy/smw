<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import BackToTop from '#lib/components/BackToTop.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
<Header />
<main id="main" tabindex="-1">
	{@render children()}
</main>
<Footer />
<BackToTop />

<style>
	.skip-link {
		position: absolute;
		left: 16px;
		top: -60px;
		z-index: 100;
		padding: 8px 16px;
		border-radius: var(--radius);
		background: var(--red);
		color: var(--on-accent);
	}

	.skip-link:focus {
		top: 16px;
	}

	main:focus {
		outline: none;
	}
</style>
