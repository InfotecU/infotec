<script lang="ts">
	import InfotecLogo from '../logo/InfotecLogo.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';
	import { Icon, ArrowRightOnRectangle } from 'svelte-hero-icons';
	import type { User } from '@supabase/supabase-js';

	type Menu = {
		name: string;
		href?: string | null;
	};

	export let menus: Menu[];
	export let user: User | null;
</script>

<nav
	class="flex w-screen max-w-screen h-24 bg-transparent fixed justify-around items-center gap-10 border-b border-stone-900 border-solid"
>
	<div class="h-20 flex items-center">
		<a href="/">
			<InfotecLogo textColor="white" width={100} height={100} />
		</a>
	</div>
	<ul class="flex justify-center gap-5">
		{#each menus as menu}
			<li>
				<a href={menu.href || '#'} class="text-stone-500 font-medium p-2 hover:text-stone-300"
					>{menu.name.toUpperCase()}</a
				>
			</li>
		{/each}
	</ul>
	{#if user}
		<NavbarUserMenu {user} on:logout />
	{:else}
		<a href="/sign-in" class="" title="Iniciar sesion">
			<Icon src={ArrowRightOnRectangle} class="h-8 text-stone-400 hover:text-stone-100" />
		</a>
	{/if}
</nav>
