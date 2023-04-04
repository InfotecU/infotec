import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const authService = locals.authService;
	const dbService = locals.dbService;

	const userService = dbService.getEntityService('users');

	const { email, password } = await request.json();

	const { data: dataUser, error: errorUser } = await userService.getOneByColumn({
		column: 'email',
		value: email
	});

	if (dataUser?.length !== 0)
		return json({ data: null, error: { message: 'ya existe un usuario con ese mail' } });

	const { data: authData, error: authError } = await authService.signup(email, password);

	if (authError)
		return json({ data: null, error: { message: 'ocurrio un error autenticando al usuario' } });

	return json({ authData, error });
};
