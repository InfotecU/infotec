import type { LayoutServerLoad } from './$types';
import MarkdownIt from 'markdown-it';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const md = new MarkdownIt();
	const session = await locals.getSession();

	const { data: courses, error } = await locals.supabase
		.from('courses')
		.select('*, sections(*, articles(*))')
		.eq('slug', params.slug);

	const course = courses[0];

	course.sections = course.sections.map((section: any) => {
		section.courseSlug = course.slug;
		section.articles = section.articles
			.sort((a1: any, a2: any) => a1.order - a2.order)
			.map((article: any) => {
				article.content = md.render(article.content);
				return article;
			});
		return section;
	});

	// If the user is logged, then show his stats
	if (!session)
		return {
			allSections: course.sections,
			sectionsComplete: null
		};

	const { data: sectionsComplete, error: errorSectionsComplete } = await locals.supabase
		.from('userCompleteSection')
		.select('*');

	return {
		allSections: course.sections,
		sectionsComplete: sectionsComplete
	};
};
