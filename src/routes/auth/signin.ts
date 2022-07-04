import supabase from '$lib/db';
import db from '$lib/db';
import User, { Profile, SignInUser } from '$lib/models/User';
import type { z } from 'zod';
import { respond } from './_respond';

export async function post({ request }) {

    const body = await request.json();
    
    const { email, password } = SignInUser.parse(body);
    
    const { session, error } = await supabase.auth.signIn({
        email, password
    });

    let user = session?.user ?? null;

    return respond(user, error);
}