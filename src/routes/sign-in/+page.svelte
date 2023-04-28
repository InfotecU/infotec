<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Error from '$lib/components/form/Error.svelte';
	import type { ActionData } from './$types';

	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
	import { createClient } from '@supabase/supabase-js';
	// import { OAuthService } from '$lib/OAuthService';
	// import { ApiService } from '$lib/ApiService';
	// import { redirect } from '@sveltejs/kit';
	// import { goto } from '$app/navigation';

	export let form: ActionData;

	const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	// let email: string, password: string;
	// const oAuthService = new OAuthService();

	// const signInEmail = async (e: SubmitEvent) => {
	// 	if (!email || !password) return (errorMessage = 'Campos incompletos');

	// 	const api = new ApiService('/api/v1/auth/signin');

	// 	const { data, error } = await api.post({ body: { email, password } });

	// 	if (error) return (errorMessage = 'Ocurrio un error en el servidor');
	// 	if (data.error) return (errorMessage = data.error.message);

	// 	goto('/');
	// };

	const signInGoogle = async (e: Event) => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		});

		// if (!error) goto('/');
	};
</script>

<main class="h-screen bg-black">
	<form
		class="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 p-10 flex flex-col gap-5 border border-stone-700 rounded-lg shadow-2xl shadow-stone-800"
		method="POST"
		action="?/emailAuth"
	>
		<h3 class="text-xl font-bold text-white">Ingresar con email</h3>
		<Input name="email" type="email" config={{ label: 'Email', placeholder: 'email' }} />
		<Input
			name="password"
			type="password"
			config={{ label: 'Contraseña', placeholder: 'contraseña' }}
		/>
		<Input type="submit" value="Ingresar" />
		{#if form?.missing}
			<Error message="Todos los campos son obligatorios" />
		{/if}
		{#if form?.incorrect}
			<Error message="Los datos ingresados son incorrectos" />
		{/if}
		<div class="bg-stone-700 h-[1px]" />

		<button
			type="button"
			class="p-2 bg-black text-white border boder-white flex justify-center gap-3 rounded-lg items-center hover:bg-white hover:text-black"
			on:click={signInGoogle}
		>
			<svg
				class="w-4 h-4 mr-2 -ml-1"
				aria-hidden="true"
				focusable="false"
				data-prefix="fab"
				data-icon="google"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 488 512"
				><path
					fill="currentColor"
					d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
				/></svg
			>

			Ingresar con Google
		</button>
		<p class="text-stone-400 font-light text-sm">
			¿No estas registrado?, entonces <a
				href="/sign-up"
				class="text-stone-300 hover:text-yellow-500 duration-75 font-bold">registrate</a
			>
		</p>
	</form>
</main>
