import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const dbService = locals.dbService;
	const coursesService = dbService.getEntityService('courses');
	const coursesBucket = dbService.getBucketService('courses');

	const { data: courses, error: coursesError } = await coursesService.getAll();

	if (coursesError || courses === null)
		throw error(500, { message: 'Hubo un error cargando los cursos' });

	return {
		courses: await Promise.all(
			courses.map(async (course: any) => {
				const { data: banner } = coursesBucket.getPublicUrl(`/banners/${course.id}.png`);
				course.banner = banner.publicUrl;
				return course;
			})
		)
	};
};
