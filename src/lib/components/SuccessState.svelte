<script lang="ts">
	let { title, message }: { title: string; message: string } = $props();
</script>

<div class="success" role="status">
	<svg width="95" height="95" viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="12" cy="12" r="10.5" fill="var(--success)" />
		<path d="M7.5 12.3l3 3 6-6.3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
	<p class="title">{title}</p>
	<p class="message">{message}</p>
</div>

<style>
	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		min-height: 320px;
		padding: 32px;
		text-align: center;
		animation: pop 0.3s ease;
	}

	svg {
		margin-bottom: 4px;
	}

	.title {
		font-family: var(--font-heading);
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: -0.01em;
		color: var(--black);
	}

	.message {
		font-family: var(--font-heading);
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: -0.03em;
		color: var(--black);
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
	}
</style>
