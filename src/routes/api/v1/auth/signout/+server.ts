import type { RequestHandler } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals, url }) => {
	const authService = locals.authService;

	const { error: logoutError } = await authService.signout();

	if (logoutError) throw error(500, { message: 'error cerrrando sesion' });

	throw redirect(301, url.href);
};
