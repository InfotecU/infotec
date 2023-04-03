import type { SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import type { SupabaseResponse } from '$lib/types/supabase';

export class EntityService {
	private supabase;
	private entity;

	/**
	 *
	 * @param entity name of table in DB
	 * @param supabase supabase client
	 */
	constructor(entity: string, supabase: SupabaseClient) {
		this.entity = entity;
		this.supabase = supabase;
	}

	/**
	 *
	 * @returns all records of table
	 */
	public getAll: () => SupabaseResponse = async () => {
		const { data, error } = await this.supabase.from(this.entity).select('*');
		return { data, error };
	};
}
