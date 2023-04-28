import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	emailAuth: async ({ request, locals, url }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');
		const passwordRepeat = formData.get('repeatPassword');

		if (!email) {
			return fail(400, { missing: true });
		}

		if (password && passwordRepeat && password !== passwordRepeat)
			return fail(404, { passwordRepeat: true });

		const { data: userData, error: userError } = await locals.supabase
			.from('users')
			.select('*')
			.eq('email', email);

		if (userData && userData.length > 0) return fail(404, { duplicateMail: true });

		let { data, error } = await locals.supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			return fail(400, { serverError: true });
		}

		throw redirect(303, '/');
	}
};
