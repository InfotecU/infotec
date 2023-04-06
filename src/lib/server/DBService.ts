import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { EntityService } from './EntityService';

export class DBService {
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

	/**
	 *
	 * @param entity name of table in DB
	 * @returns a set of CRUD operations for entity
	 */
	public getEntityService = (entity: string) => new EntityService(entity, this.supabase);

	/**
	 *
	 * @param bucket name of the bucket
	 * @returns a bucket or an error
	 */
	public getBucketService = (bucket: string) => this.supabase.storage.from(bucket);
}
