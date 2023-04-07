<script lang="ts">
	export let content: string;
	export let href: string | null = null;
</script>

<div
	class="bg-gradient-to-r flex p-[1px] justify-center items-center rounded-lg z-20 relative from-yellow-500 to-orange-500 gradient_yellow"
>
	{#if href}
		<a
			class=" rounded-lg p-4 text-stone-100 bg-gray-950 text-md font-bold outline-none hover:bg-transparent hover:text-black duration-75"
			{href}
		>
			{content}
		</a>
	{:else}
		<button
			class=" rounded-lg p-4 text-stone-100 bg-gray-950 text-md font-bold outline-none hover:bg-transparent hover:text-black duration-75"
			on:click
		>
			{content}
		</button>
	{/if}
</div>

<style lang="postcss">
	.gradient_yellow:before {
		content: '';
		z-index: -1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: linear-gradient(-45deg, #fff95b 0%, #ff930f 100%);
		transform: translate3d(0px, 0px, 0) scale(0.9);
		filter: blur(20px);
		opacity: 0.7;
		transition: opacity 0.3s;
		border-radius: inherit;
	}
</style>
