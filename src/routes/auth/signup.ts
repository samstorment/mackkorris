import supabase from '$lib/db';
import db from '$lib/db';
import User, { Profile, SignInUser } from '$lib/models/User';
import type { z } from 'zod';
import { respond } from './_respond';

export async function post({ request }) {

    const body = await request.json();
    
    try {
        const { email, password } = SignInUser.parse(body);
    
        const { session, error } = await supabase.auth.signUp({
            email, password
        });

        if (error) throw error;
        if (!session?.user) throw new Error("Signup failed");

        const { data: profile, error: profileError } = await db
            .from<z.infer<typeof Profile>>('profiles')
            .select('*')
            .eq('id', session?.user.id)
            .single();

        if (profileError) throw profileError;

        const user = User.parse({ ...session.user, profile });
        
        return respond(user);
    } catch (err: any) {
        return respond(undefined, err.message);
    }
}