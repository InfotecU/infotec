<script lang="ts">
	import type { PageData } from './$types';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/atom-one-dark.css';

	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		hljs.highlightAll();
	});
</script>

<p class="bg-rose-500">pueba tailwind</p>
{@html data.html}
