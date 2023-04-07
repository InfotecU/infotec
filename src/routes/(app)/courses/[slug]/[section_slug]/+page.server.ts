import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import MarkdownIt from 'markdown-it';

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
