import * as z from 'zod';
export const createFollowerInputSchema = z.object({
    followerUserID: z.string(),
    followedUserID: z.string(),
});
export type CreateFollowerInput ={
    followerUserID: string;
    followedUserID: string;
}