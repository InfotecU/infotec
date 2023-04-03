import type { SupabaseResponse } from '$lib/types/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ res: Awaited<SupabaseResponse> }> = async ({ locals }) => {
	const testService = locals.dbService.getEntityService('test');

	return {
		res: await testService.getAll()
	};
};
