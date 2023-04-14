<script lang="ts">
	import { stringify } from 'postcss';

	type Course = {
		title: string;
		summary: string;
		level: number;
		banner: string;
		id: number;
		slug: string;
		labels?: { label: string; color: string }[];
	};

	export let course: Course;
</script>

<div
	class="w-96 rounded-lg overflow-hidden hover:-translate-y-1 duration-75 shadow-lg border border-stone-700"
>
	<a href={`/courses/${course.slug}`}>
		<img src={course.banner} alt={`${course.title} - banner`} class="w-96" />
		<!-- <div class={`bg-[url('${course.banner}')] w-96 h-48`} /> -->
		<div class="p-5 bg-stone-900 h-full">
			<h3 class="text-xl font-bold text-stone-100">{course.title}</h3>
			<p class="text-sm font-medium text-stone-300">{course.summary}</p>
		</div>
	</a>
</div>
