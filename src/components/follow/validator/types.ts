import * as z from 'zod';
export const createFollowerInputSchema = z.object({
    followedUserId: z.string(),
});
export type CreateFollowerInput ={
    followedUserId: string;
}