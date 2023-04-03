import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession }, params }) => {
	console.log('session:  ', await getSession());
	console.log('params:  ', params);
	return {
		session: await getSession()
	};
};
