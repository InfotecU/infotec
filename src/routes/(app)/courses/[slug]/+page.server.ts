import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.getSession();

	const dbService = locals.dbService;
	const courseServices = dbService.getEntityService('courses');
	const sectionServices = dbService.getEntityService('sections');

	const { data: courseData, error: courseError } = await courseServices.getFilterByColumn({
		column: 'slug',
		value: params.slug
	});

	if (courseError || courseData == null)
		throw error(500, { message: 'Ocurrio un error cargando el curso' });

	if (courseData?.length === 0)
		throw error(400, { message: 'El curso que estas intentando buscar no existe' });

	const course = courseData[0];

	const { data: sectionsData, error: sectionsError } = await sectionServices.getFilterByColumn({
		column: 'course_id',
		value: course.id
	});

	if (sectionsError || sectionsData == null)
		throw error(500, { message: 'Ocurrio un error cargando el curso' });

	course.sections = sectionsData
		.sort((section1, section2) => section1.order - section2.order)
		.map((section) => {
			section.courseSlug = course.slug;
			return section;
		});

	return {
		course: course,
		session
	};
};
