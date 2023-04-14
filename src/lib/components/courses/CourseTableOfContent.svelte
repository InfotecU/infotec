<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import { DonutChart } from '@carbon/charts-svelte';
	import { createEventDispatcher } from 'svelte';

	type Article = {
		title: string;
		content: string;
		id: number;
		order: number;
		section_id: number;
	};

	type Section = {
		id: number;
		created_at: Date;
		title: string;
		summary: string;
		order: number;
		slug: string;
		course_id: number;
		courseSlug: string;
		articles: Article[];
	};

	export let sections: Section[];
	export let selectecSectionSlug: string;
	export let sectionsCompletes: {
		total: number;
		complete: number;
		sectionsComplete: { user_id: number; section_id: number }[];
	} | null = null;

	const dispatch = createEventDispatcher();

	const isSectionComplete = (
		sectionCompletes: { user_id: number; section_id: number }[] | null | undefined,
		sectionId: number
	) => {
		if (!sectionCompletes) return false;

		return sectionCompletes.some((sectionComplete) => sectionComplete.section_id === sectionId);
	};
</script>

<aside class="h-full w-[400px] text-right flex flex-col gap-10 justify-between">
	<div class="overflow-y-scroll scrollbar-none">
		{#each sections as section}
			<a
				class="text-xl font-medium text-stone-200 hover:text-slate-300 truncate flex justify-end gap-1 items-center"
				class:selectec={selectecSectionSlug === section.slug}
				href={`/courses/${section.courseSlug}/${section.slug}`}
				><span>
					{section.title}
				</span>
				<span class="text-sm">
					{isSectionComplete(sectionsCompletes?.sectionsComplete, section.id) ? '✅' : '⌛'}
				</span>
			</a>
			<!-- <div class="h-[2px] w-full rounded-full bg-slate-800 mt-3 mb-3" /> -->
			<ul class="">
				{#each section.articles as article}
					<li class="text-medium font-light text-stone-500 mt-2 mb-2 hover:text-stone-300 truncate">
						<button
							on:click={() => {
								dispatch('article-click', { title: article.title });
							}}
						>
							{article.title}
						</button>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
	{#if sectionsCompletes}
		<div class="flex justify-end items-center gap-1">
			<p class="text-stone-200 font-bold">
				{sectionsCompletes.complete} / {sectionsCompletes.total}
			</p>
			<DonutChart
				class="grow-0"
				data={[
					{ group: 'Completas', value: sectionsCompletes.complete },
					{ group: 'Restantes', value: sectionsCompletes.total - sectionsCompletes.complete }
				]}
				options={{
					title: '',
					height: '40px',
					width: '40px',
					color: {
						scale: {
							Completas: '#eab308',
							Restantes: '#00000055'
						}
					},
					pie: {
						labels: {
							enabled: false
						}
					},
					donut: {
						center: {
							label: '',
							numberFontSize: () => 0
						}
					},
					toolbar: {
						enabled: false
					},
					tooltip: {
						enabled: false
					},
					legend: {
						enabled: false
					}
				}}
			/>
		</div>
	{/if}
	<!-- {JSON.stringify(sections)} -->
</aside>

<style lang="postcss">
	.selectec {
		@apply text-yellow-500;
	}

	.selectec:hover {
		@apply text-yellow-500;
	}
</style>
