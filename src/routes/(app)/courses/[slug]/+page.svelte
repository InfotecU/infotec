<script lang="ts">
	import type { PageServerData } from './$types';
	import SectionCard from '$lib/components/courses/CourseSectionCard.svelte';

	export let data: PageServerData;
</script>

<section
	class="flex flex-col gap-5 justify-start items-center h-3/5 overflow-y-scroll scrollbar-none"
>
	<h1 class="text-4xl font-bold text-stone-100">{data.course.title}</h1>
	<p class="text-xl font-medium text-stone-500">{data.course.summary}</p>
	<div class="h-1 w-56 m-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
	<h1 class="text-4xl font-bold text-stone-100">Secciones</h1>
	<div class="flex flex-wrap gap-5 justify-center">
		{#each data.course.sections as section}
			<SectionCard {section} />
		{/each}
	</div>
	{#if !data.session}
		<p class="text-sm font-medium text-stone-600 mt-10">
			¿No iniciaste sesion? <a href="/sign-in" class="text-stone-400 font-bold hover:text-stone-300"
				>Inicia sesion</a
			> para comenzar a visualizar tu progreso!
		</p>
	{/if}
</section>
