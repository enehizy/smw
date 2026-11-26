<script lang="ts">
	import { subjects } from '../data.ts';
	import Icon from './Icon.svelte';

	let { value = $bindable(''), id, invalid = false }: { value?: string; id: string; invalid?: boolean } =
		$props();

	let open = $state(false);
	let active = $state(0);
	let root: HTMLDivElement | undefined = $state();
	let button: HTMLButtonElement | undefined = $state();
	const listId = $derived(`${id}-list`);

	function choose(subject: string) {
		value = subject;
		open = false;
		button?.focus();
	}

	function openList() {
		active = Math.max(0, subjects.indexOf(value));
		open = true;
	}

	function onKeydown(e: KeyboardEvent) {
		if (!open) {
			if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
				e.preventDefault();
				openList();
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = (active + 1) % subjects.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = (active - 1 + subjects.length) % subjects.length;
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			choose(subjects[active]);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			e.stopPropagation();
			open = false;
		} else if (e.key === 'Tab') {
			open = false;
		}
	}
</script>

<svelte:window
	onclick={(e) => {
		if (open && !root?.contains(e.target as Node)) open = false;
	}}
/>

<div class="select" bind:this={root}>
	<button
		bind:this={button}
		{id}
		type="button"
		class="field trigger"
		class:invalid
		class:placeholder={!value}
		role="combobox"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls={listId}
		aria-activedescendant={open ? `${listId}-${active}` : undefined}
		onclick={() => (open ? (open = false) : openList())}
		onkeydown={onKeydown}
	>
		<span>{value || 'Subject'}</span>
		<span class="chevron" class:flip={open}><Icon name="chevron-down" /></span>
	</button>

	{#if open}
		<ul class="options" id={listId} role="listbox" aria-label="Subject">
			{#each subjects as subject, i (subject)}
				<li
					id="{listId}-{i}"
					role="option"
					aria-selected={value === subject}
					class:active={i === active}
					onclick={() => choose(subject)}
					onkeydown={() => {}}
					onpointermove={() => (active = i)}
				>
					{subject}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.select {
		position: relative;
	}

	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.trigger.placeholder span:first-child {
		color: var(--muted);
	}

	.chevron {
		display: grid;
		color: var(--ink);
		transition: transform 0.2s ease;
	}

	.chevron.flip {
		transform: rotate(180deg);
	}

	.options {
		position: absolute;
		z-index: 5;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		background: var(--blush);
		border-radius: 5px;
		box-shadow: 0 10px 28px rgb(0 0 0 / 0.16);
		overflow: hidden;
	}

	li {
		padding: 14px 12px;
		color: var(--ink);
		cursor: pointer;
	}

	li.active {
		background: var(--blush-strong);
	}

	li[aria-selected='true'] {
		font-weight: 500;
		color: var(--red-text);
	}
</style>
