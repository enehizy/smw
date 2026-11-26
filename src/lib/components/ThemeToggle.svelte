<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';
	let theme = $state<Theme>('light');

	onMount(() => {
		// app.html sets the attribute before paint; read it back here.
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

		// Follow the system setting until the visitor picks a theme themselves.
		const media = matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			if (stored()) return;
			apply(e.matches ? 'dark' : 'light');
		};
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	});

	function stored() {
		try {
			return localStorage.getItem('smw-theme');
		} catch {
			return null;
		}
	}

	function apply(next: Theme) {
		theme = next;
		document.documentElement.dataset.theme = next;
	}

	function toggle() {
		const next = theme === 'dark' ? 'light' : 'dark';
		apply(next);
		try {
			localStorage.setItem('smw-theme', next);
		} catch {
			// Storage unavailable (private mode); the choice lasts for this page view.
		}
	}
</script>

<button
	class="theme-toggle"
	type="button"
	onclick={toggle}
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
>
	{#if theme === 'dark'}
		<!-- Sun -->
		<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="4.5" fill="currentColor" />
			<g stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
			</g>
		</svg>
	{:else}
		<!-- Moon -->
		<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" fill="currentColor" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		flex: none;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.theme-toggle:hover {
		background: var(--blush);
		color: var(--red-text);
	}
</style>
