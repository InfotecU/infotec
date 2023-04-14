<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { Icon, UserCircle } from 'svelte-hero-icons';
	import { ApiService } from '$lib/ApiService';

	export let user: User;
	let dropMenu = false;

	const menus = [
		{
			name: 'Estadisticas',
			slug: 'stats'
		},
		{
			name: 'Configuracion',
			slug: 'settings'
		},
		{
			name: 'Cerrar sesion',
			onClick: async () => {
				const api = new ApiService('/api/v1/auth/signout');
				await api.post({});
			}
		}
	];
</script>

<div class="relative">
	<button on:click={() => (dropMenu = !dropMenu)}>
		<Icon
			src={UserCircle}
			class="w-10 h-10 text-stone-400 hover:text-stone-200 hover:cursor-pointer"
		/>
	</button>
	{#if dropMenu}
		<ul class="absolute bg-stone-900 rounded-lg p-0 top-[100] left-1/2 -translate-x-1/2 w-56">
			<li>
				<p class="text-stone-200 text-sm p-4 text-center font-bold">{user.email}</p>
			</li>
			{#each menus as menu}
				<li class=" flex">
					{#if !menu.slug}
						<button
							class="text-sm text-slate-200 hover:text-stone-200 hover:bg-stone-800 min-w-full min-h-full p-2"
							on:click={menu.onClick}
						>
							{menu.name}
						</button>
					{:else}
						<a
							href={`/me/${menu.slug}`}
							class="text-sm text-slate-200 hover:text-stone-200 hover:bg-stone-800 min-w-full min-h-full p-2 text-center"
						>
							{menu.name}
						</a>
					{/if}
				</li>
			{/each}

			<li class="flex pb-3" />
		</ul>
	{/if}
</div>
<!-- <p class="text-white">{user.email}</p> -->
