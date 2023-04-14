import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

export class AuthService {
	private supabase;

	/**
	 *
	 * @param event event passed from hook.server.ts
	 */
	constructor(
		event: Pick<RequestEvent<Partial<Record<string, string>>, string | null>, 'cookies'>
	) {
		this.supabase = createSupabaseServerClient({
			supabaseUrl: PUBLIC_SUPABASE_URL,
			supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
			event
		});
	}

	public getSession = async () => {
		const {
			data: { session }
		} = await this.supabase.auth.getSession();
		return session;
	};

	public setSession = async ({
		access_token,
		refresh_token
	}: {
		access_token: string;
		refresh_token: string;
	}) => {
		return await this.supabase.auth.setSession({ access_token, refresh_token });
	};

	public signup = async (email: string, password: string) => {
		let { data, error } = await this.supabase.auth.signUp({
			email,
			password
		});

		return { data, error };
	};

	public signin = async (email: string, password: string) => {
		let { data, error } = await this.supabase.auth.signInWithPassword({
			email,
			password
		});

		return { data, error };
	};

	public signout = async () => {
		return await this.supabase.auth.signOut();
	};
}
