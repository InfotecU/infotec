import { redirect, type Actions, json } from '@sveltejs/kit';

export const actions: Actions = {
	setSession: async ({ locals, request }) => {
		const formData = await request.formData();

		await locals.supabase.auth.setSession({
			access_token: formData.get('access_token'),
			refresh_token: formData.get('refresh_token')
		});

		throw redirect(300, '/');
	},
	signout: async ({ locals }) => {
		await locals.supabase.auth.signOut();
	}
};
