
import type User from "$lib/models/User";
import type { z } from "zod";


export function respond(
    user: z.infer<typeof User>, 
    message: string, 
    error: string, 
    status: number
) {

    const value = Buffer
        .from(JSON.stringify(user))
        .toString('base64');

    return {
        headers: {
            'set-cookie': `user=${value}; Path=/; HttpOnly`
        },
        body: {
            user,
            message,
            error,
            status
        }
    }
}