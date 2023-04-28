import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	// if the user logged with google, the session is generated manually
	const url = new URL(event.url.href as string);
	const access_token = new URLSearchParams(url.hash).get('#access_token');
	const refresh_token = new URLSearchParams(url.hash).get('refresh_token');

	if (!access_token || !refresh_token) return {};

	const formData = new FormData();
	formData.append('access_token', access_token);
	formData.append('refresh_token', refresh_token);

	await fetch('?/setSession', { method: 'POST', body: formData });

	throw redirect(300, '/');
};
