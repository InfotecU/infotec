import { AuthService } from '$lib/server/AuthService';
import { DBService } from '$lib/server/DBService';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authService = new AuthService(event);
	const dbService = new DBService(event);

	event.locals.getSession = authService.getSession;
	event.locals.authService = authService;
	event.locals.dbService = dbService;

	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
