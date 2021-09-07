import * as z from 'zod';
export const createFollowerInputSchema = z.object({
    followerUserId: z.string(),
    followedUserId: z.string(),
});
export type CreateFollowerInput ={
    followerUserId: string;
    followedUserId: string;
}