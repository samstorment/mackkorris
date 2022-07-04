import db from '$lib/db';

export async function get() {

    await db.auth.signOut();

	return {
		status: 303,
		headers: {
			'set-cookie': 'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
			location: "/"
		}
	};
}