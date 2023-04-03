// See https://kit.svelte.dev/docs/types#app

import type { AuthService } from '$lib/server/AuthService';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession(): Promise<Session | null>;
			authService: AuthService;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
