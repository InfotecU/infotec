import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const authService = locals.authService;

	const { access_token, refresh_token } = await request.json();

	const { data, error } = await authService.setSession({ access_token, refresh_token });

	return json({ data, error });
};
