import { z } from "zod";
import { dateSchema } from "./ZodUtils";

const id = z.string().uuid();
const email = z.string().min(1).max(400).email();
const password = z.string().min(6).max(50);
const username = z.string().min(3).max(20);
const display_name = z.string().min(3).max(100);
const profileUrl = z.string().url().nullable();

export const LoginUser = z.object({ email, password });

export const SignupUser = LoginUser.merge(
    z.object({ 
        username, 
        display_name 
    })
);

export const SupabaseUser = z.object({
    id,
    email,
    created_at: dateSchema,
    confirmed_at: dateSchema.nullable()
});

export const Profile = z.object({
    id,
    username,
    display_name,
    updated_at: dateSchema,
    bio: z.string().max(200).nullable(),
    avatar_url: profileUrl,
    website_url: profileUrl,
    twitter_url: profileUrl,
    instagram_url: profileUrl,
    tiktok_url: profileUrl,
    youtube_url: profileUrl
});

const User = SupabaseUser.merge(Profile);

export default User;