import * as z from 'zod';

export const threadSchema = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters required' }),
    accountId: z.string(),
});

export const CommentSchema = z.object({
    thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});