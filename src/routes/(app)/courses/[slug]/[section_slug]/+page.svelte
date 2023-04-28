<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CourseTableOfContent from '$lib/components/courses/CourseTableOfContent.svelte';
	import CourseArticle from '$lib/components/courses/CourseArticle.svelte';
	import ButtonGradientYellow from '$lib/components/buttons/ButtonGradientYellow.svelte';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	export let data: PageServerData;
	let articleTitleSelected = '';
	let loadingCompleteSection = false;

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

	const completeSection = async (e: Event) => {
		if (!$page.data.session) goto(data.nextSection?.slug || '/courses');
		loadingCompleteSection = true;

		const formData = new FormData();
		formData.append('sectionId', data.section.id);
		formData.append('userUid', $page.data.session.user.id);

		await fetch('?/completeSection', { method: 'POST', body: formData });

		loadingCompleteSection = false;
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
			on:article-click={selectArticle}
		/>
	{/if}
	<div class="w-[1px] h-ful rounded-full bg-stone-900" />
	<Spinner />
	<CourseArticle articles={data.section.articles} {articleTitleSelected}>
		<div class="flex justify-end m-5">
			<ButtonGradientYellow on:click={completeSection} shadow={false}>
				{#if !loadingCompleteSection}
					{data.allSections.at(-1).id === data.section.id ? 'Finalizar curso' : 'Siguiente seccion'}
				{:else}
					<Spinner color="#FFF" />
				{/if}
			</ButtonGradientYellow>
		</div>
	</CourseArticle>
</section>
