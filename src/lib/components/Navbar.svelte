<script lang="ts">
	import InfotecLogo from './logo/InfotecLogo.svelte';
	import { Icon, ArrowRightOnRectangle } from 'svelte-hero-icons';

	type Menu = {
		name: string;
		href?: string | null;
	};

	type User = {
		email: string;
		role: string;
		id: string;
	};

	export let menus: Menu[];
	export let user: User | null;
</script>

<nav class="flex w-screen max-w-screen h-24 bg-black justify-around items-center gap-10">
	<div class="h-20 flex items-center">
		<a href="/">
			<InfotecLogo textColor="white" width={100} height={100} />
		</a>
	</div>
	<ul class="flex justify-center gap-5">
		{#each menus as menu}
			<li>
				<a href={menu.href || '#'} class="text-stone-100 font-bold p-2 hover:text-yellow-400"
					>{menu.name.toUpperCase()}</a
				>
			</li>
		{/each}
	</ul>
	{#if user}
		<p>logged</p>
	{:else}
		<a href="/sign-in" class="" title="Iniciar sesion">
			<Icon src={ArrowRightOnRectangle} class="h-8 text-stone-400 hover:text-stone-100" />
		</a>
	{/if}
</nav>
