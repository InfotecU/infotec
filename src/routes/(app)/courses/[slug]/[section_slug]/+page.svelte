<script lang="ts">
	import type { LayoutServerData } from './$types';
	import { page } from '$app/stores';
	import CourseTableOfContent from '$lib/components/courses/CourseTableOfContent.svelte';
	import CourseArticle from '$lib/components/courses/CourseArticle.svelte';

	export let data: LayoutServerData;
</script>

<section class="w-5/6 h-5/6 flex gap-5">
	<CourseTableOfContent
		sections={data.allSections}
		selectecSectionSlug={$page.params.section_slug}
	/>
	<div class="w-1 h-ful rounded-full bg-slate-600" />
	<CourseArticle articles={data.section.articles} />
</section>
