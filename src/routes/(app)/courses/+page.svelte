<script lang="ts">
	import type { PageServerData } from './$types';
	import CourseCard from '$lib/components/courses/CourseCard.svelte';

	export let data: PageServerData;
</script>

<div>
	{#each data.courses as course}
		<CourseCard {course} />
	{/each}
</div>
