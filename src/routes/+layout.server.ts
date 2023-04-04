import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, dbService }, params }) => {
	const session = await getSession();

	const userService = dbService.getEntityService('users');

	if (!session) return { session: null };

	const { data, error } = await userService.getOneByColumn({
		column: 'email',
		value: session.user.email
	});

	// if user is authenticated for first time then insert into users table
	if (data?.length === 0 && !error) {
		await userService.create({
			username: 'USER',
			email: session.user.email,
			avatar_image_url: 'test.png',
			uid: session.user.id,
			role: 'USER'
		});
	}

	return {
		session: session
	};
};
