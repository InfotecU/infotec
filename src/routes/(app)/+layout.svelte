<script lang="ts">
	import type { LayoutServerData } from './$types';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';

	export let data: LayoutServerData;
</script>

<Navbar
	menus={[
		{ name: 'Cursos', href: '/courses' },
		{ name: 'Sobre nosotros', href: '/about' }
	]}
	user={data.session ? data.session.user : null}
	on:logout={async () => {
		await fetch('?/signout', { method: 'POST', body: new FormData() });
		location.href = '/';
	}}
/>

<main class="h-screen bg-black flex justify-center items-center">
	<slot />
</main>
