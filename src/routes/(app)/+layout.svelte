<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	console.log(data);
</script>

<Navbar menus={[{ name: 'Cursos' }, { name: 'Sobre nosotros' }]} user={null} />
<main class="h-[calc(100vh-96px)] bg-black">
	<slot />
</main>
