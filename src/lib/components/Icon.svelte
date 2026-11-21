<script lang="ts">
	import { icons, type IconName } from '../icons.ts';

	let {
		name,
		size,
		label,
		class: className = ''
	}: { name: IconName; size?: number; label?: string; class?: string } = $props();

	const icon = $derived(icons[name]);
	const dims = $derived(icon.viewBox.split(' ').map(Number));
	const width = $derived(size ?? dims[2]);
	const height = $derived(size ? (size * dims[3]) / dims[2] : dims[3]);
</script>

<svg
	class={className}
	{width}
	{height}
	viewBox={icon.viewBox}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	{@html icon.body}
</svg>
