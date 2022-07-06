import User, { Profile, SignupUser } from "$lib/models/User";
import db from '$lib/db';
import type { z } from "zod";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ locals }) {

    if (locals.user) {
        return {
            headers: { Location: '/' },
            status: 303
        };
    }

    return {};
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {

    const form = await request.formData();

    const formData = {
        email: form.get('email'),
        password: form.get('password'),
        display_name: form.get('display_name'),
        username: form.get('username')
    }

    try {
        const signupUser = SignupUser.parse(formData);

        const { data: existingUsername } = await db
            .from<z.infer<typeof Profile>>('profiles')
            .select('username')
            .ilike('username', signupUser.username);

        if (existingUsername) throw new Error("Username already exists");
        
        const { error, session } = await db.auth.signUp(signupUser);

        if (!session?.user || error) throw error;

        const { data: profile } = await db
            .from<z.infer<typeof Profile>>('profiles')
            .insert([{
                id: session.user.id, 
                ...signupUser 
            }])
            .single();

        const user = User.parse({ ...session.user, ...profile });

        const value = Buffer
            .from(JSON.stringify(user))
            .toString('base64');

        return {
            headers: {
                'set-cookie': `user=${value}; Path=/; HttpOnly`,
                Location: '/profile'
            },
            status: 303
        };

    } catch (e: any) {
        return {
            status: 401,
            body: {
                ...formData,
                error: e.message
            }
        }
    }
}