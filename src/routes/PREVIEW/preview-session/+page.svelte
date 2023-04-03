<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let email: string, password: string;

	const submit = async (e: SubmitEvent) => {
		const res = await fetch('/api/v1/auth/signup', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		console.log(await res.json());
	};

	const login = async (e: SubmitEvent) => {
		const res = await fetch('/api/v1/auth/signin', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		});

		console.log(await res.json());
	};
</script>

<p>Sign up</p>
<form on:submit|preventDefault={submit}>
	<input type="email" bind:value={email} />
	<input type="password" bind:value={password} />
	<input type="submit" />
</form>

<p>Sign in</p>
<form on:submit|preventDefault={login}>
	<input type="email" bind:value={email} />
	<input type="password" bind:value={password} />
	<input type="submit" />
</form>

<p>Session</p>
<span>
	{#if data.session}
		{JSON.stringify(data.session)}
		USER: {data.session.user.email}
		ID: {data.session.user.id}
		ROLE: {data.session.user.role}
	{:else}
		<span>no session</span>
	{/if}
</span>

<p>RLS</p>
<span>{JSON.stringify(data.res)}</span>
