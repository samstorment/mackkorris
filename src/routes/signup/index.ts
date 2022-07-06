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
            .ilike('username', signupUser.username)
            .single();

        if (existingUsername) throw new Error("Username already exists");

        const { user, error, session } = await db.auth.signUp(signupUser);
        
        console.log("USER, ERROR, SESSION", user, error, session);

        if (!user || error) throw error;


        const { data: profile, error: profileError } = await db
            .from<z.infer<typeof Profile>>('profiles')
            .insert([{
                id: user.id,
                username: signupUser.username,
                display_name: signupUser.display_name
            }])
            .single();

        if (profileError) throw profileError;

        console.log("PROFILE", profile);

        const userWithProfile = User.parse({ ...user, ...profile });

        const value = Buffer
            .from(JSON.stringify(userWithProfile))
            .toString('base64');

        return {
            headers: {
                'set-cookie': `user=${value}; Path=/; HttpOnly`,
                Location: '/profile'
            },
            status: 303
        };

    } catch (e: any) {
        console.log("ERROR", e.message);

        return {
            status: 401,
            body: {
                ...formData,
                error: e.message
            }
        }
    }
}