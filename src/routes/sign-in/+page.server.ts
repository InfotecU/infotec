import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	emailAuth: async ({ request, locals, url }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return fail(400, { missing: true });
		}

		let { data, error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return fail(400, { incorrect: true });
		}

		throw redirect(303, '/');
	}
};
