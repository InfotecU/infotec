<script lang="ts">
	type Section = {
		id: number;
		created_at: Date;
		title: string;
		summary: string;
		order: number;
		slug: string;
		course_id: number;
		courseSlug: string;
	};

	export let section: Section;
</script>

<a
	class="bg-stone-900 border border-stone-700 hover:border-stone-500 p-5 rounded-lg hover:-translate-y-1 border-solid"
	href={`/courses/${section.courseSlug}/${section.slug}`}
>
	<p class="text-xl font-bold text-stone-200 flex items-center justify-start gap-1">
		<strong class="text-yellow-500">{section.order}</strong>
		{section.title}
	</p>
	<span class="text-md font-medium text-gray-400">{section.summary}</span>
</a>
