<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		label,
		width = 600,
		children
	}: { open?: boolean; label: string; width?: number; children: Snippet } = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	aria-label={label}
	style="--modal-width: {width}px"
	onclose={() => (open = false)}
	onclick={(e) => {
		if (e.target === dialog) open = false;
	}}
>
	{#if open}
		<div class="wrap">
			<button class="close" type="button" aria-label="Close" onclick={() => (open = false)}>
				<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
					<path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
				</svg>
			</button>
			{@render children()}
		</div>
	{/if}
</dialog>

<style>
	dialog {
		width: min(var(--modal-width), calc(100vw - 32px));
		max-width: none;
		max-height: calc(100dvh - 32px);
		padding: 0;
		border: 0;
		background: transparent;
		overflow: visible;
	}

	dialog::backdrop {
		background: rgb(18 18 18 / 0.6);
		backdrop-filter: blur(2px);
	}

	dialog[open] {
		animation: rise 0.22s ease;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-height: calc(100dvh - 32px);
		overflow-y: auto;
	}

	.close {
		align-self: flex-end;
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		flex: none;
		border: 0;
		border-radius: 50%;
		background: var(--blush);
		color: var(--muted);
		cursor: pointer;
	}

	.close:hover {
		color: var(--red-text);
	}

	.wrap :global(.email-card),
	.wrap :global(.call-card) {
		border-radius: 25px;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}
</style>
