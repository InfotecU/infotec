import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export class OAuthService {
	private supabase;

	constructor() {
		this.supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	}

	public signInWithGoogle = async () => {
		return await this.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		});
	};
}
