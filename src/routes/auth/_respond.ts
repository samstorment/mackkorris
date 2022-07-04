import type { ApiError, User } from "@supabase/supabase-js";
import db from '$lib/db';
import type { Profile } from "$lib/models/User";
import AuthUser from "$lib/models/User";

export async function respond(
	user: User | null,
	error: ApiError | null, 
	status = 401
) {

	if (!user || error) {
		return { 
			status, 
			body: { 
				error: error || "Auth Failed" 
			}
		};
	}

    const { data: profile } = await db
        .from<Zod.infer<typeof Profile>>('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    const authUser = AuthUser.parse({ ...user, profile });

	console.log(authUser);

	const value = Buffer
		.from(JSON.stringify(authUser))
		.toString('base64');

	return {
		headers: {
			'set-cookie': `user=${value}; Path=/; HttpOnly`
		},
		body: {
			user: authUser,
			error
		}
	};
}