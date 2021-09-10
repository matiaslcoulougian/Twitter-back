import {CreateFollowerInput, createFollowerInputSchema} from "@/components/follow/validator/types";

export class FollowerValidator{
    public static validateCreateFollowerBody(body: unknown): CreateFollowerInput{
        const result= createFollowerInputSchema.safeParse(body);
        if(!result.success){
            throw new Error(result.error.message);
        }
        return result.data;
    }
}