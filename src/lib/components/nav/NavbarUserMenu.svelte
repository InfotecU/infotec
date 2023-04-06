<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import { Icon, UserCircle } from 'svelte-hero-icons';

	export let user: User;
	let dropMenu = true;
</script>

<div class="relative">
	<button on:click={() => (dropMenu = !dropMenu)}>
		<Icon
			src={UserCircle}
			class="w-10 h-10 text-stone-400 hover:text-stone-200 hover:cursor-pointer"
		/>
	</button>
	{#if dropMenu}
		<ul class="absolute bg-slate-900 rounded-lg p-0 top-[100] left-1/2 -translate-x-1/2 w-56">
			<li>
				<p class="text-stone-200 text-sm p-4">{user.email}</p>
			</li>
			<li class=" flex">
				<a
					href={`/users/${user.id}/courses`}
					class="text-sm text-slate-200 hover:text-stone-200 hover:bg-slate-800 min-w-full min-h-full p-2"
				>
					Mis cursos
				</a>
			</li>
			<li class=" flex">
				<a
					href={`/users/${user.id}/profile`}
					class="text-sm text-slate-200 hover:text-stone-200 hover:bg-slate-800 min-w-full min-h-full p-2"
				>
					Mi perfil
				</a>
			</li>
			<li class=" flex">
				<a
					href={`/users/${user.id}/settings`}
					class="text-sm text-slate-200 hover:text-stone-200 hover:bg-slate-800 min-w-full min-h-full p-2 mb-3"
				>
					Configuracion
				</a>
			</li>
			<li class="flex pb-1" />
		</ul>
	{/if}
</div>
<!-- <p class="text-white">{user.email}</p> -->
