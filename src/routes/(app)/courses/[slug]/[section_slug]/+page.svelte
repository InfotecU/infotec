<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CourseTableOfContent from '$lib/components/courses/CourseTableOfContent.svelte';
	import CourseArticle from '$lib/components/courses/CourseArticle.svelte';
	import { ApiService } from '$lib/ApiService';
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

		const api = new ApiService('/api/v1/sections/complete');

		await api.post({
			body: {
				sectionId: data.section.id,
				userUid: $page.data.session.user.id
			}
		});

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
			<!-- <div
				class="bg-gradient-to-r flex p-[1px] justify-center items-center rounded-lg z-20 relative from-yellow-500 to-orange-500 gradient_yellow"
			> -->
			<!-- <button
					class=" rounded-lg p-4 bg-slate-800 text-stone-100 text-md font-bold outline-none hover:bg-transparent hover:text-black duration-75"
					on:click={completeSection}
				>
					{data.allSections.at(-1).id === data.section.id ? 'Finalizar curso' : 'Siguiente seccion'}
				</button> -->
			<ButtonGradientYellow on:click={completeSection} shadow={false}>
				{#if !loadingCompleteSection}
					{data.allSections.at(-1).id === data.section.id ? 'Finalizar curso' : 'Siguiente seccion'}
				{:else}
					<Spinner color="#FFF" />
				{/if}
			</ButtonGradientYellow>
			<!-- </div> -->
		</div>
	</CourseArticle>
</section>
