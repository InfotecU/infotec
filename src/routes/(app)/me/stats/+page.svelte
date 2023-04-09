<script lang="ts">
	import type { PageServerData } from './$types';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import { RadarChart } from '@carbon/charts-svelte';

	export let data: PageServerData;

	const parseData = (data: PageServerData) =>
		data.scores.map((score) => {
			return {
				product: 'puntos',
				feature: score.name,
				score: data.scoresSection
					?.filter((scoreSection) => scoreSection.score_id === score.id)
					.map((scoreSection) => scoreSection.value)
					.reduce((accumulator, value) => accumulator + value, 0)
			};
		});

	// return data.scoresSection?.map((scoresSection) => {
	// 	return {
	// 		product: 'estadisticas',
	// 		feature: data.scores.find((score) => score.id === scoresSection.score_id)?.name,
	// 		score: scoresSection.value
	// 	};
	// });

	console.log(parseData(data));

	// estadisticas:
	// puntos totales
	//
</script>

<section
	class="flex flex-col gap-5 justify-start items-center h-4/5 overflow-y-scroll scrollbar-none"
>
	<h1 class="text-4xl font-bold text-stone-100">Estadisticas</h1>
	<div class="h-1 w-56 m-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
	<div
		class="bg-transparent p-5 rounded-lg w-[500px] flex justify-center items-center text-white chart"
	>
		<RadarChart
			data={parseData(data)}
			options={{
				title: '',
				radar: {
					axes: {
						angle: 'feature',
						value: 'score'
					},
					alignment: 'center'
				},
				data: {
					groupMapsTo: 'product'
				},
				color: {
					scale: {
						puntos: '#eab308'
					}
				},
				height: '400px',

				toolbar: {
					enabled: false
				},
				tooltip: {
					enabled: true
				},
				legend: {
					enabled: false
				},
				theme: 'g90'
			}}
		/>
	</div>
</section>

<style lang="postcss">
	.chart text {
		fill: white !important;
	}
</style>
