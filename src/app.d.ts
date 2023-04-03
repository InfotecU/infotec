// See https://kit.svelte.dev/docs/types#app

import type { AuthService } from '$lib/server/AuthService';
import type { DBService } from '$lib/server/DBService';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession(): Promise<Session | null>;
			authService: AuthService;
			dbService: DBService;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
