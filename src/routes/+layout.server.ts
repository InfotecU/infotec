import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase }, params }) => {
	const session = await getSession();

	if (!session) return { session: null };

	const { data, error } = await supabase.from('users').select('*').eq('email', session.user.email);

	if (data?.length === 0 && !error) {
		await supabase.from('users').insert({
			username: 'USER',
			email: session.user.email,
			avatar_image_url: session.user.id + '.png',
			uid: session.user.id,
			role: 'USER'
		});
	}

	return {
		session: session
	};
};
