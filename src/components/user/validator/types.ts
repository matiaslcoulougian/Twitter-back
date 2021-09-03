import * as z from 'zod';
import {date} from "zod";
export const createUserInputSchema = z.object({
    id: z.number(),
    name: z.string(),
    bibliography: z.string(),
    password: z.string(),
    phone:z.string(),
    email: z.string().email('Invalid mail format'),
    userName: z.string(),
    location: z.string(),
    webSite: z.string(),
    birthDay: z.string(),
    createdAt: z.string(),
    isActive: z.boolean(),
});
export type CreateUserInput = {
    id: number;
    name: string;
    bibliography: string;
    password: string;
    phone: string;
    email: string;
    userName: string;
    location: string;
    webSite: string;
    birthDay: string;
    createdAt: string ;
    isActive: boolean;
};