<script lang="ts">
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';
	import { onMount } from 'svelte';

	type Article = {
		title: string;
		content: string;
		id: number;
		order: number;
		section_id: number;
	};

	onMount(() => {
		hljs.highlightAll();
	});

	export let articles: Article[];

	const tagStylesTailwind = {
		h1: 'text-4xl font-bold text-stone-200 mb-5 ,t-5',
		h2: 'text-2xl font-bold text-stone-200 mb-2 mt-5',
		p: 'text-md font-medium text-slate-400 mb-5',
		ul: 'text-md font-medium text-slate-400 list-disc list-inside mb-5',
		strong: 'text-md font-bold text-slate-200',
		code: 'mb-5 mt-5'
	};

	const getAllContents = () =>
		articles
			.map((article) => article.content + '\n')
			.reduce((allContents, content) => allContents + content, '');

	const populateStyles = (htmlContent: string) => {
		let newHtml = htmlContent.replace(/<h1>/g, `<h1 class="${tagStylesTailwind.h1}">`);
		newHtml = newHtml.replace(/<h2>/g, `<h2 class="${tagStylesTailwind.h2}">`);
		newHtml = newHtml.replace(/<p>/g, `<p class="${tagStylesTailwind.p}">`);
		newHtml = newHtml.replace(/<ul>/g, `<ul class="${tagStylesTailwind.ul}">`);
		newHtml = newHtml.replace(/<strong>/g, `<strong class="${tagStylesTailwind.strong}">`);
		newHtml = newHtml.replace(/<pre>/g, `<pre class="${tagStylesTailwind.code}">`);
		return newHtml;
	};
</script>

<article class="grow h-full overflow-y-scroll article scrollbar-none">
	{@html populateStyles(getAllContents())}
</article>
