<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { javascript } from '@codemirror/lang-javascript';
	import { oneDark } from '@codemirror/theme-one-dark';

	let value = "console.log(6); console.log('otro log')";
	let arrayLog: any[] = [];

	const log = (message: any) => {
		console.log(message, 'desde log');
		arrayLog = [...arrayLog, message];
	};

	// console.log(6); console.log('otro log')
</script>

<div class="w-1/2 p-10">
	<CodeMirror bind:value lang={javascript()} theme={oneDark} />
	<button
		class="bg-rose-500"
		on:click={() => {
			eval(value.replace(/console./g, ''));
		}}>run</button
	>
	<p>
		{value.replace(/console./g, '')}
	</p>
	<p>
		{JSON.stringify(arrayLog)}
	</p>
</div>
