import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const dbService = locals.dbService;

	const courseServices = dbService.getEntityService('courses');
	const sectionServices = dbService.getEntityService('sections');
	const articleServices = dbService.getEntityService('articles');

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

			section.articles = articlesData;
			section.courseSlug = courseData[0].slug;
			return section;
		})
	);

	return {
		allSections: sections
	};
};
