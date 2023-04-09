<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { Icon, UserCircle } from 'svelte-hero-icons';

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
		}
	];
</script>

<div class="relative">
	<button on:click={() => (dropMenu = !dropMenu)}>
		<Icon
			src={UserCircle}
			class="w-10 h-10 text-slate-400 hover:text-slate-200 hover:cursor-pointer"
		/>
	</button>
	{#if dropMenu}
		<ul class="absolute bg-slate-900 rounded-lg p-0 top-[100] left-1/2 -translate-x-1/2 w-56">
			<li>
				<p class="text-stone-200 text-sm p-4">{user.email}</p>
			</li>
			{#each menus as menu}
				<li class=" flex">
					<a
						href={`/me/${menu.slug}`}
						class="text-sm text-slate-200 hover:text-stone-200 hover:bg-slate-800 min-w-full min-h-full p-2"
					>
						{menu.name}
					</a>
				</li>
			{/each}

			<li class="flex pb-3" />
		</ul>
	{/if}
</div>
<!-- <p class="text-white">{user.email}</p> -->
