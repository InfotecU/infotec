<script lang="ts">
	import { OAuthService } from '$lib/OAuthService';
	import { ApiService } from '$lib/ApiService';
	import Input from '$lib/components/form/Input.svelte';
	import Error from '$lib/components/form/Error.svelte';

	let email: string, password: string, repeatPassword: string;
	let errorMessage = '';
	const oAuthService = new OAuthService();

	// TODO: cambiar por ApiService
	const signUpEmail = async (e: SubmitEvent) => {
		if (!email || !password) return (errorMessage = 'Campos incompletos');
		if (password !== repeatPassword) return (errorMessage = 'Las contraseñas no coinciden');
		if (password.length < 6)
			return (errorMessage = 'La contraseña debe tener 6 caracteres como minimo');

		const api = new ApiService('/api/v1/auth/signup');

		const { data, error } = await api.post({ body: { email, password } });

		if (error) errorMessage = 'Ocurrio un error en el servidor';
		if (data.error) errorMessage = data.error.message;
	};

	const signInGoogle = async (e: Event) => {
		const { data, error } = await oAuthService.signInWithGoogle();
	};
</script>

<main class="h-screen bg-black">
	<form
		class="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 p-10 flex flex-col gap-5 border border-stone-700 rounded-lg shadow-2xl shadow-stone-800"
		on:submit|preventDefault={signUpEmail}
	>
		<h3 class="text-xl font-bold text-white">Registrarse con email</h3>
		<Input bind:value={email} type="email" config={{ label: 'Email', placeholder: 'email' }} />
		<Input
			bind:value={password}
			type="password"
			config={{ label: 'Contraseña', placeholder: 'contraseña' }}
		/>
		<Input
			bind:value={repeatPassword}
			type="password"
			config={{ label: 'Contraseña', placeholder: 'escriba su contraseña nuevamente' }}
		/>
		<Input type="submit" value="Registrarse" />
		{#if errorMessage}
			<Error message={errorMessage} />
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
			Registrarme con Google
		</button>
		<p class="text-stone-400 font-light text-sm">
			¿Ya estas registrado?, entonces <a
				href="/sign-in"
				class="text-stone-300 hover:text-yellow-500 duration-75 font-bold">inicia sesion</a
			>
		</p>
	</form>
</main>
