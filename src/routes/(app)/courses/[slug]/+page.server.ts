import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.getSession();

	const { data: course, error } = await locals.supabase
		.from('courses')
		.select('*, sections(*)')
		.eq('slug', params.slug);

	return {
		course: course[0],
		session
	};
};
