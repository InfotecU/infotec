import type { PostgrestError } from '@supabase/supabase-js';

/**
 * Supabase select response
 */
export type SupabaseResponse = Promise<{
	data: { [key: string]: any }[] | null;
	error: PostgrestError | null;
}>;
