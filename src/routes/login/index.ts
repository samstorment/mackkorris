import { z } from "zod";
import db from '$lib/db';



export async function post({ request }) {

    const form = await request.formData();
    
    const email = form.get('email');
    const password = form.get('password');

    let status = 200;
    let error = '';
    let message = `Magic sign in link sent to ${email}`;

    try {

        z.string().min(1).email().parse(email);
        z.string().min(1).parse(password);
        
        let { error } = await db.auth.signIn({ email, password });

        if (error) throw error;
    } catch (e: any) {
        status = 401;
        error = e.message;
        message = '';
    }

    return {
        status,
        body: {
            email,
            password,
            error,
            message
        }
    }
}