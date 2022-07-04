import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const user = cookies.user && Buffer.from(cookies.user, 'base64').toString('utf-8');

    event.locals.user = user ? JSON.parse(user) : null;

	return await resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {

	return {
		user: locals.user || null
	};
}