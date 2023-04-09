<script lang="ts">
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<Navbar
	menus={[
		{ name: 'Cursos', href: '/courses' },
		{ name: 'Sobre nosotros', href: '/about' }
	]}
	user={data.session ? data.session.user : null}
/>
<!-- <main
	class="h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black flex justify-center items-center"
> -->
<main class="h-screen bg-gradient-to-b from-gray-950 to-gray-800 flex justify-center items-center">
	<slot />
</main>

<!-- radial-gradient(at center center, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0)) -->
<!-- bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black -->
