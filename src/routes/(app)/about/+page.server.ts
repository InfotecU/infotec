import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	let { data: staff, error } = await locals.supabase.from('staff').select('*');

	staff = staff.map((member: any) => {
		const { data: photo } = locals.supabase.storage.from('staff').getPublicUrl(`${member.id}.png`);
		member.photo = photo.publicUrl;
		return member;
	});

	return { staff };
};
