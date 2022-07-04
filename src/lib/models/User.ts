import { z } from "zod";
import { dateSchema } from "./ZodUtils";

export const SupabaseUser = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    created_at: dateSchema.optional(),
    confirmed_at: dateSchema
});

export const SignInUser = z.object({
    email: z.string().email().min(1),
    password: z.string().min(1)
});

export const Profile = z.object({
    id: z.string().uuid(),
    username: z.string().min(3),
    display_name: z.string().min(3),
    updated_at: dateSchema,
    bio: z.string().max(200).nullable(),
    avatar_url: z.string().url().nullable(),
    website_url: z.string().url().nullable(),
    twitter_url: z.string().url().nullable(),
    instagram_url: z.string().url().nullable(),
    tiktok_url: z.string().url().nullable(),
    youtube_url: z.string().url().nullable()
});

const User = SupabaseUser.extend({
    profile: Profile.optional()
});

export default User;