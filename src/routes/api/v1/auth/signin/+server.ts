import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const authService = locals.authService;

	const { email, password } = await request.json();

	const { data, error } = await authService.signin(email, password);

	return json({ data, error });
};
