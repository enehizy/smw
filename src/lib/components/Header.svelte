<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { nav } from '../data.ts';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let open = $state(false);
	let panel: HTMLElement | undefined = $state();
	let toggle: HTMLButtonElement | undefined = $state();

	// Mobile order: Home, About Us, Artists & Music, News & Updates, Shop, Contact.
	const mobileNav = [...nav.slice(0, 4), { label: 'Shop', href: '/shop' }, ...nav.slice(4)];

	function isActive(href: string) {
		const path = page.url.pathname;
		if (href === '/') return path === '/';
		if (href === '/about') return path === '/about' || path.startsWith('/services');
		if (href === '/artists') return path.startsWith('/artists') || path.startsWith('/music');
		return path.startsWith(href);
	}

	afterNavigate(() => (open = false));

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			toggle?.focus();
		}
	}

	function onWindowClick(e: MouseEvent) {
		if (!open) return;
		const target = e.target as Node;
		if (!panel?.contains(target) && !toggle?.contains(target)) open = false;
	}
</script>

<svelte:window onkeydown={onKeydown} onclick={onWindowClick} />

<header class="site-header">
	<div class="inner">
		<Logo />

		<nav class="desktop-nav" aria-label="Main">
			<ul>
				{#each nav as item (item.href)}
					<li>
						<a
							class="nav-link"
							class:active={isActive(item.href)}
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="actions">
			<a
				class="shop-link"
				class:active={isActive('/shop')}
				href="/shop"
				aria-current={isActive('/shop') ? 'page' : undefined}
				>Shop<span class="badge">Coming soon</span></a
			>

			<ThemeToggle />

			<button
				bind:this={toggle}
				class="menu-toggle"
				type="button"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				<span class="bars" class:open aria-hidden="true"><span></span><span></span><span></span></span>
			</button>
		</div>
	</div>

	<div bind:this={panel} id="mobile-menu" class="mobile-menu" class:open hidden={!open}>
		<p class="menu-title">Menu</p>
		<nav aria-label="Mobile">
			<ul>
				{#each mobileNav as item (item.href)}
					<li>
						<a
							class="mobile-link"
							class:active={isActive(item.href)}
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							>{item.label}{#if item.href === '/shop'}<span class="badge">Coming soon</span>{/if}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--bg);
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		max-width: calc(var(--content) + 2 * var(--gutter));
		margin-inline: auto;
		padding: 24px var(--gutter);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.desktop-nav ul {
		display: flex;
		gap: 8px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.nav-link,
	.shop-link {
		display: inline-flex;
		align-items: center;
		min-height: 52px;
		padding: 10px 16px;
		border-radius: var(--radius);
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 20px;
		line-height: 28px;
		color: var(--ink);
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.nav-link:hover {
		background: var(--blush);
	}

	.nav-link.active {
		background: var(--red-dark);
		color: var(--on-accent);
	}

	.nav-link {
		white-space: nowrap;
	}

	.shop-link {
		position: relative;
		padding-inline: 28px;
		border: 1px solid var(--red);
		color: var(--red-text);
	}

	.shop-link:hover {
		background: var(--blush);
	}

	.shop-link.active {
		background: var(--red);
		color: var(--on-accent);
	}

	.badge {
		position: absolute;
		top: -9px;
		right: -10px;
		padding: 2px 7px;
		border-radius: 999px;
		background: var(--red);
		color: var(--on-accent);
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 10px;
		line-height: 14px;
		letter-spacing: 0.02em;
		white-space: nowrap;
		pointer-events: none;
	}

	.shop-link.active .badge {
		background: var(--dark);
	}

	.mobile-link .badge {
		position: static;
		margin-left: 12px;
		font-size: 12px;
		line-height: 16px;
		padding: 3px 9px;
	}

	.mobile-link.active .badge {
		background: var(--on-accent);
		color: var(--red-dark);
	}

	.menu-toggle {
		display: none;
		width: 44px;
		height: 44px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.bars {
		position: relative;
		display: block;
		width: 26px;
		height: 20px;
		margin: auto;
	}

	.bars span {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		border-radius: 2px;
		background: var(--red);
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}

	.bars span:nth-child(1) {
		top: 0;
	}

	.bars span:nth-child(2) {
		top: 9px;
	}

	.bars span:nth-child(3) {
		top: 18px;
	}

	.bars.open span:nth-child(1) {
		transform: translateY(9px) rotate(45deg);
	}

	.bars.open span:nth-child(2) {
		opacity: 0;
	}

	.bars.open span:nth-child(3) {
		transform: translateY(-9px) rotate(-45deg);
	}

	.mobile-menu {
		position: absolute;
		top: 100%;
		right: 0;
		width: min(440px, 100%);
		padding: 24px;
		border-radius: 0 0 0 var(--radius);
		background: var(--blush);
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
	}

	.mobile-menu[hidden] {
		display: none;
	}

	.menu-title {
		padding: 10px;
		border-bottom: 1px solid var(--line);
		margin-bottom: 12px;
		font-family: var(--font-display);
		font-size: 32px;
		line-height: 36px;
		letter-spacing: 0.04em;
		color: var(--red-text);
	}

	.mobile-menu ul {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.mobile-link {
		display: flex;
		align-items: center;
		min-height: 52px;
		padding: 10px 16px;
		border-radius: var(--radius);
		border-bottom: 1px solid var(--line);
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: -0.01em;
	}

	.mobile-link.active {
		background: var(--red-dark);
		color: var(--on-accent);
	}

	/* Five links plus Shop and the theme toggle need ~1200px; tighten them first, then collapse. */
	@media (max-width: 1360px) {
		.nav-link {
			padding-inline: 12px;
			font-size: 18px;
		}

		.shop-link {
			padding-inline: 22px;
			font-size: 18px;
		}
	}

	@media (max-width: 1180px) {
		.desktop-nav,
		.shop-link {
			display: none;
		}

		.actions {
			gap: 8px;
		}

		.menu-toggle {
			display: block;
		}

		.inner {
			padding-block: 16px;
		}
	}
</style>
