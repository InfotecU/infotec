<script lang="ts">
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
</script>

<aside class="h-ful w-[30%] text-right">
	{#each sections as section}
		<a
			class="text-xl font-extrabold text-stone-200 hover:text-slate-300 hover:mr-6 mr-5"
			class:selectec={selectecSectionSlug === section.slug}
			href={`/courses/${section.courseSlug}/${section.slug}`}>{section.title}</a
		>
		<!-- <div class="h-[2px] w-full rounded-full bg-slate-800 mt-3 mb-3" /> -->
		<ul>
			{#each section.articles as article}
				<li class="text-medium font-bold text-slate-500">{article.title}</li>
			{/each}
		</ul>
	{/each}
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
