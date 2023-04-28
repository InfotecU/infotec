import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: courses, error: coursesError } = await locals.supabase.from('courses').select('*');

	if (coursesError || courses === null)
		throw error(500, { message: 'Hubo un error cargando los cursos' });

	return {
		courses: await Promise.all(
			courses.map(async (course: any) => {
				const { data: banner } = locals.supabase.storage
					.from('courses')
					.getPublicUrl(`/banners/${course.id}.png`);
				course.banner = banner.publicUrl;
				return course;
			})
		)
	};
};
