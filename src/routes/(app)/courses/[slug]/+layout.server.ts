import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import MarkdownIt from 'markdown-it';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	console.log('LAYOUT LOAD');

	const dbService = locals.dbService;

	const courseServices = dbService.getEntityService('courses');
	const sectionServices = dbService.getEntityService('sections');
	const articleServices = dbService.getEntityService('articles');

	const md = new MarkdownIt();

	const session = await locals.getSession();

	const { data: courseData, error: courseError } = await courseServices.getOneByColumn({
		column: 'slug',
		value: params.slug
	});

	if (courseError || courseData == null)
		throw error(500, { message: 'Ocurrio un error cargando el contenido del curso' });

	const { data: sectionsData, error: sectionError } = await sectionServices.getOneByColumn({
		column: 'course_id',
		value: courseData[0].id
	});

	if (sectionError || sectionsData == null)
		throw error(500, { message: 'Ocurrio un error cargando el contenido del curso' });

	const sections = await Promise.all(
		sectionsData?.map(async (section) => {
			const { data: articlesData, error: articleError } = await articleServices.getOneByColumn({
				column: 'section_id',
				value: section.id
			});

			if (articleError || articlesData == null)
				throw error(500, { message: 'Ocurrio un error cargando el contenido del curso' });

			section.articles = articlesData
				.sort((a1, a2) => a1.order - a2.order)
				.map((article) => {
					article.content = md.render(article.content);
					return article;
				});
			section.courseSlug = courseData[0].slug;
			return section;
		})
	);

	// If the user is logged, then show his stats
	if (session) {
		const statsServices = dbService.getEntityService('userCompleteSection');

		const { data: sectionsCompleteData, error: sectionsCompleteError } =
			await statsServices.getAll();

		return {
			allSections: sections.sort((s1, s2) => s1.order - s2.order),
			sectionsComplete: sectionsCompleteError ? null : sectionsCompleteData
		};
	}

	return {
		allSections: sections.sort((s1, s2) => s1.order - s2.order),
		sectionsComplete: null
	};
};
