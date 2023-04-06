<script lang="ts">
	import InfotecLogoAnimated from '$lib/components/logo/InfotecLogoAnimated.svelte';
	import ButtonGradientYellow from '$lib/components/buttons/ButtonGradientYellow.svelte';
</script>

<section class="flex flex-col justify-center items-center">
	<div class="flex justify-center items-center gap-10">
		<InfotecLogoAnimated textColor="white" width={600} height={600} />
		<h1 class=" text-[64px] text-white font-[900] w-1/2 title_anim">
			Espacio de <strong class="text-yellow-300">extension</strong> dedicado al desarrollo de
			<strong class="text-orange-500">software</strong>.
		</h1>
	</div>
	<div class="flex gap-6">
		<a
			class="rounded-lg p-4 text-black text-md font-bold border bg-white flex justify-center items-center hover:text-white hover:bg-transparent duration-75"
			href="#"
			>Registrarse
		</a>
		<ButtonGradientYellow content="Comenzar" href="#" />
	</div>
</section>

<style>
	.title_anim {
		animation: 1s ease-out title;
	}

	@keyframes title {
		from {
			transform: translateX(20px);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
