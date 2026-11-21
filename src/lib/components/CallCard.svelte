<script lang="ts">
	import { site } from '../data.ts';
	import Icon from './Icon.svelte';
</script>

<div class="call-card">
	<h3 class="heading title-md">
		<span class="icon"><Icon name="call" /></span>
		Give us a call
	</h3>
	{#each site.phones as phone (phone)}
		<a class="phone" href="tel:{phone.replace(/\s/g, '')}">{phone}</a>
	{/each}
</div>

<style>
	.call-card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 32px;
		border-radius: var(--radius);
		background: var(--blush);
	}

	.heading {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.icon {
		display: grid;
		color: var(--red);
	}

	.phone {
		color: var(--ink);
		width: fit-content;
	}

	.phone:hover {
		color: var(--red);
		text-decoration: underline;
	}
</style>
