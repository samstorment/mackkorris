import { z } from "zod";
import db from '$lib/db';
import { LoginUser, type Profile } from "$lib/models/User";
import User from "$lib/models/User";

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
    
    const email = form.get('email');
    const password = form.get('password');

    try {
        const loginUser = LoginUser.parse({ email, password });
        
        let { error, session } = await db.auth.signIn(loginUser);

        if (!session?.user || error) throw error;

        const { data: profile } = await db
            .from<Zod.infer<typeof Profile>>('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        const user = User.parse({ ...session.user, ...profile });

        const value = Buffer
            .from(JSON.stringify(user))
            .toString('base64');

        return {
            headers: {
                'set-cookie': `user=${value}; Path=/; HttpOnly`,
                Location: '/'
            },
            status: 303
        };

    } catch (e: any) {
        return {
            status: 401,
            body: {
                email,
                password,
                error: e.message
            }
        }
    }
}