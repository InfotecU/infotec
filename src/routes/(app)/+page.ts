import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ApiService } from '$lib/ApiService';

export const load: PageLoad = async (event) => {
	// if the user logged with google, the session is generated manually
	const url = new URL(event.url.href as string);
	const access_token = new URLSearchParams(url.hash).get('#access_token');
	const refresh_token = new URLSearchParams(url.hash).get('refresh_token');

	if (!access_token || !refresh_token) return {};

	const api = new ApiService('/api/v1/auth/set-session');

	const { data, error } = await api.post({ body: { access_token, refresh_token } });

	if (error === null) throw redirect(300, '/');
};
