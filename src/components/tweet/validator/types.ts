import * as z from 'zod';
export const createTweetInputSchema= z.object({
    text: z.string(),
    userId: z.string(),
    parentTweetId: z.string().optional(),

});
export type CreateTweetInput= {
    text: string;
    userId: string;
    parentTweetId?: string;
}