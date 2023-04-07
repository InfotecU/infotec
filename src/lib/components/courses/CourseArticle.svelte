<script lang="ts">
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';
	import { onMount, afterUpdate } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	type Article = {
		title: string;
		content: string;
		id: number;
		order: number;
		section_id: number;
	};

	let mounted = false;
	onMount(() => {
		hljs.highlightAll();
		mounted = true;
	});

	afterUpdate(() => {
		if (!mounted) return;
		hljs.highlightAll();
	});

	export let articles: Article[];
	export let articleTitleSelected = '';
	let content = '';

	const tagStylesTailwind = {
		h1: 'text-4xl font-bold text-stone-200 mb-5 ,t-5',
		h2: 'text-2xl font-bold text-stone-200 mb-2 mt-5',
		p: 'text-md font-medium text-slate-400 mb-5',
		ul: 'text-md font-medium text-slate-400 list-disc list-inside mb-5',
		li: 'mt-1',
		strong: 'text-md font-bold text-slate-200',
		code: 'mb-5 mt-5'
	};

	const dispatch = createEventDispatcher();

	const getAllContents = (articles: Article[]) =>
		articles
			.map((article) => article.content + '\n')
			.reduce((allContents, content) => allContents + content, '');

	const populateStyles = (htmlContent: string) => {
		let newHtml = htmlContent.replace(/<h1>/g, `<h1 class="${tagStylesTailwind.h1}">`);
		newHtml = newHtml.replace(/<h2>/g, `<h2 class="${tagStylesTailwind.h2}">`);
		newHtml = newHtml.replace(/<p>/g, `<p class="${tagStylesTailwind.p}">`);
		newHtml = newHtml.replace(/<ul>/g, `<ul class="${tagStylesTailwind.ul}">`);
		newHtml = newHtml.replace(/<li>/g, `<li class="${tagStylesTailwind.ul}">`);
		newHtml = newHtml.replace(/<strong>/g, `<strong class="${tagStylesTailwind.strong}">`);
		newHtml = newHtml.replace(/<pre>/g, `<pre class="${tagStylesTailwind.code}">`);
		return newHtml;
	};

	const getContentFormated = (articles: Article[]) => populateStyles(getAllContents(articles));

	const scrollToArticle = (articleTitleSelected: string) => {
		if (!mounted) return;
		const h2 = [...document.querySelectorAll('h2')].find(
			(h) => h.textContent === articleTitleSelected
		);
		if (!h2) return;
		h2.scrollIntoView({
			behavior: 'smooth'
		});
	};

	// cuando actualizamos el contenido, el componente puede seguir vivio
	$: content = getContentFormated(articles);
	$: scrollToArticle(articleTitleSelected);
</script>

<article class="grow h-full overflow-y-scroll article scrollbar-none w-full">
	{@html content}
	<div class="flex justify-end">
		<div
			class="bg-gradient-to-r flex p-[1px] justify-center items-center rounded-lg z-20 relative from-yellow-500 to-orange-500 gradient_yellow"
		>
			<button
				class=" rounded-lg p-4 bg-slate-800 text-stone-100 text-md font-bold outline-none hover:bg-transparent hover:text-black duration-75"
				on:click={() => {
					dispatch('finish-section', { id: articles[0].section_id });
				}}
			>
				Completar seccion
			</button>
		</div>
	</div>
</article>
