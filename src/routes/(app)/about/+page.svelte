<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<!-- <p class="text-white">{JSON.stringify(data)}</p> -->
<section
	class="flex flex-col gap-5 justify-start items-center h-screen p-32 overflow-y-scroll scrollbar-none"
>
	<h1 class="text-4xl font-bold text-stone-100">Sobre nosotros</h1>
	<!-- <p class="text-xl font-medium text-stone-500">Conoce mas sobre infotec</p> -->
	<!-- <div class="h-1 w-56 m-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" /> -->
	<p class="text-xl font-medium text-stone-500">
		Infotec es un espacio de extensión que se desarrolla en la Facultad de Ingeniería de la UNLP.
		Nuestro objetivo es formar a los alumnos próximos a egresarse e ingresar en la universidad en el
		mundo del desarrollo de software.
	</p>
	<h1 class="text-4xl font-bold text-stone-100">Nuestro staff</h1>
	<p class="text-xl font-medium text-stone-500">
		Nuestro staff está conformado por profesionales y estudiantes de la UNLP.
	</p>
	<div class="h-1 w-56 m-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
		&nbsp;
	</div>
	<h3 class="text-3xl font-bold text-white">Tutores</h3>
	<div class="flex flex-wrap gap-10 justify-center items-center">
		{#each data.staff.filter((member) => member.role === 'TUTOR') as member}
			<div class="flex flex-col justify-center items-center gap-3">
				<img src={member.photo} alt="foto de tutor" class="rounded-full" />
				<h2 class="text-white font-bold text-xl">{member.name}</h2>
				<h3 class="text-yellow-500 opacity-90 font-medium text-md">{member.title}</h3>
			</div>
		{/each}
	</div>
	<div class="h-1 w-56 m-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
		&nbsp;
	</div>
	<h3 class="text-3xl font-bold text-white">Colaboradores</h3>
	<div class="flex flex-wrap gap-10 justify-center items-center">
		{#each data.staff.filter((member) => member.role === 'COLABORADOR') as member}
			<div class="flex flex-col justify-center items-center gap-3">
				<img src={member.photo} alt="foto de tutor" class="rounded-full" />
				<h2 class="text-white font-bold text-xl">{member.name}</h2>
				<h3 class="text-yellow-500 opacity-90 font-medium text-md">{member.title}</h3>
			</div>
		{/each}
	</div>
</section>
