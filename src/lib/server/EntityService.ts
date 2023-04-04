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
	 * @returns all records of table or an error
	 */
	public getAll: () => SupabaseResponse = async () => {
		const { data, error } = await this.supabase.from(this.entity).select('*');
		return { data, error };
	};

	public getOneByColumn: (filter: {
		column: string;
		value: string | number | boolean;
	}) => SupabaseResponse = async (filter: { column: string; value: string | number | boolean }) => {
		const { data, error } = await this.supabase
			.from(this.entity)
			.select('*')
			.eq(filter.column, filter.value);
		return { data, error };
	};

	/**
	 *
	 * @param record record data in JSON format
	 * @returns the record inserted or an error
	 */
	public create: (record: any) => SupabaseResponse = async (record: any) => {
		const { data, error } = await this.supabase.from(this.entity).insert(record);
		return { data, error };
	};
}
