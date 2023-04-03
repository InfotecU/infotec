<script lang="ts">
	export let value: string | number;
	export let type: string = 'text';
	export let config: {
		label?: string;
		placeholder?: string;
		required?: boolean;
	} = {};
</script>

{#if type == 'email'}
	<input
		bind:value
		type="email"
		placeholder={config.placeholder || ''}
		class="bg-stone-700 p-2 rounded-lg border border-stone-600 focus:ring-0 outline-none text-stone-300"
	/>
{:else if type == 'password'}
	<input
		bind:value
		type="password"
		placeholder={config.placeholder || ''}
		class="bg-stone-700 p-2 rounded-lg border border-stone-600 focus:ring-0 outline-none text-stone-300"
	/>
{:else if type == 'submit'}
	<div
		class="bg-gradient-to-r flex p-[1px] justify-center items-center rounded-lg z-20 relative from-yellow-500 to-orange-500 gradient_yellow"
	>
		<input
			type="submit"
			{value}
			class="w-full rounded-lg text-white bg-black p-2 hover:cursor-pointer hover:bg-transparent duration-75 hover:text-black"
		/>
	</div>
{/if}
