<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CourseTableOfContent from '$lib/components/courses/CourseTableOfContent.svelte';
	import CourseArticle from '$lib/components/courses/CourseArticle.svelte';
	import { ApiService } from '$lib/ApiService';

	export let data: PageServerData;
	let articleTitleSelected = '';

	const parseProgress = (sectionsComplete: { user_id: number; section_id: number }[]) => {
		return {
			total: data.allSections.length,
			complete: sectionsComplete.filter(({ section_id }: { section_id: number }) =>
				data.allSections.some((section: any) => section.id === section_id)
			).length,
			sectionsComplete: sectionsComplete
		};
	};

	const selectArticle = (e: CustomEvent) => {
		articleTitleSelected = e.detail.title;
	};

	const completeSection = async (e: CustomEvent) => {
		if (!$page.data.session) goto(data.nextSection?.slug || '/courses');

		const api = new ApiService('/api/v1/sections/complete');

		const { data: insertData, error } = await api.post({
			body: {
				sectionId: e.detail.id,
				userUid: $page.data.session.user.id
			}
		});

		goto(data.nextSection?.slug || '/courses');
	};
</script>

<section class="w-5/6 h-5/6 flex gap-5 mt-10">
	{#if data.sectionsComplete}
		<CourseTableOfContent
			sections={data.allSections}
			selectecSectionSlug={$page.params.section_slug}
			sectionsCompletes={parseProgress(data.sectionsComplete)}
			on:article-click={selectArticle}
		/>
	{:else}
		<CourseTableOfContent
			sections={data.allSections}
			selectecSectionSlug={$page.params.section_slug}
		/>
	{/if}
	<div class="w-1 h-ful rounded-full bg-slate-600" />
	<CourseArticle
		articles={data.section.articles}
		on:finish-section={completeSection}
		{articleTitleSelected}
	/>
</section>
