import * as z from 'zod';
export const createTweetInputSchema= z.object({
    text: z.string(),
    userID: z.string(),
    parentTweetID: z.string().optional(),

});
export type CreateTweetInput= {
    text: string;
    userID: string;
    parentTweetID?: string;
}