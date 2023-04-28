import type { PageServerLoad } from './$types';
import type { Database } from '$lib/types/supabase';
import type { Session } from '@supabase/supabase-js';

export const load: PageServerLoad<{
	course: Database['public']['Tables']['courses']['Row'];
	session: Session | null;
}> = async ({ locals, params }) => {
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
