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
	class="bg-gray-700 p-5 rounded-lg w-56 h-32 hover:-translate-y-1"
	href={`/courses/${section.courseSlug}/${section.slug}`}
>
	<p class="text-xl font-bold text-stone-200 flex items-end justify-start gap-1">
		<strong class="text-yellow-500">{section.order}</strong>
		{section.title}
	</p>
	<span class="text-md font-medium text-gray-400">{section.summary}</span>
</a>
