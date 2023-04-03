import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log('session:  ', await getSession());
	return {
		session: await getSession()
	};
};
