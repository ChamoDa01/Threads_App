import * as z from 'zod';

export const userSchema = z.object({
    username: z.string().min(3).max(30),
    name: z.string().min(3).max(30),
    bio: z.string().min(3).max(1000),
    profile_photo: z.string().url().nonempty(),
});