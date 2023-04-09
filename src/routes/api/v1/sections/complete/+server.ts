import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw error(401, { message: 'Unauthorized' });
	}

	const body = await request.json();

	const dbService = locals.dbService;
	const sectionsCompleteService = dbService.getEntityService('userCompleteSection');
	const userService = dbService.getEntityService('users');

	const { data: dataUser, error: errorUser } = await userService.getFilterByColumn({
		column: 'uid',
		value: body.userUid
	});

	if (errorUser || dataUser === null || dataUser?.length == 0)
		throw error(400, { message: 'Hubo un problema con los datos del usuario' });

	const { data: dataInsert, error: errorInsert } = await sectionsCompleteService.create({
		user_id: dataUser[0].id,
		section_id: body.sectionId
	});

	if (errorInsert) throw error(500, { message: 'Hubo un problema completando la seccion' });

	return json({ data: dataInsert, error: null });
};
