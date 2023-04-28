import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
	await parent();
	const { data: scores, error: errorScore } = await locals.supabase.from('scores').select('*');
	const { data: sectionComplete, error: errorComplete } = await locals.supabase
		.from('userCompleteSection')
		.select('*');
	const { data: scoresSection, error: errorScoreSection } = await locals.supabase
		.from('sectionGiveScore')
		.select('*')
		.in(
			'section_id',
			sectionComplete.map((complete: any) => complete.section_id)
		);

	return {
		scores,
		scoresSection
	};
};
