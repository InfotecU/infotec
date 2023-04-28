import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params, parent }) => {
	const { allSections, sectionsComplete }: { allSections: any; sectionsComplete: any | null } =
		await parent();

	const section = allSections.find((section: any) => section.slug === params.section_slug);

	const nextSection =
		allSections[
			allSections.findIndex((section: any) => section.slug === params.section_slug) + 1
		] || null;

	return {
		section,
		allSections,
		nextSection,
		sectionsComplete
	};
};

export const actions: Actions = {
	completeSection: async ({ locals, request }) => {
		const session = await locals.getSession();

		const formData = await request.formData();

		const userUid = formData.get('userUid');
		const sectionId = formData.get('sectionId');

		if (!userUid || !sectionId) return fail(404, { incomplete: true });

		const { data: user, error: userError } = await locals.supabase
			.from('users')
			.select('*')
			.eq('uid', session.user.id);

		const { data, error } = await locals.supabase
			.from('userCompleteSection')
			.insert({ user_id: user[0].id, section_id: sectionId })
			.select('*');
	}
};
