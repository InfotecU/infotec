<script lang="ts">
	import type { PageServerData } from './$types';
	import CourseCard from '$lib/components/courses/CourseCard.svelte';

	export let data: PageServerData;
</script>

<section
	class="flex flex-col gap-5 justify-start items-center h-screen p-32 overflow-y-scroll scrollbar-none"
>
	<h1 class="text-4xl font-bold text-stone-100">Cursos</h1>
	<p class="text-xl font-medium text-stone-500">Completa cursos y suma puntos!</p>
	<div class="h-1 w-56 m-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
	<div class="grid grid-cols-4 gap-10">
		{#each data.courses as course}
			<CourseCard {course} />
		{/each}
	</div>
</section>
