import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	// si el usuario se logeo con google, lo envia a la pagina principal con el token como query param, de ser asi registramos la session
	const url = new URL(event.url.href as string);
	const access_token = new URLSearchParams(url.hash).get('#access_token');
	const refresh_token = new URLSearchParams(url.hash).get('refresh_token');

	const res = await event.fetch('/api/v1/auth/set-session', {
		method: 'POST',
		body: JSON.stringify({ access_token, refresh_token })
	});

	const { data, error } = await res.json();

	if (error === null) throw redirect(300, '/');
};
