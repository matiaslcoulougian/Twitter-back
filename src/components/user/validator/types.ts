import * as z from 'zod';
import {date} from "zod";
export const createUserInputSchema = z.object({
    id: z.number(),
    name: z.string(),
    bibliography: z.string().optional(),
    password: z.string(),
    phone:z.string(),
    email: z.string().email('Invalid mail format'),
    userName: z.string(),
    location: z.string().optional(),
    webSite: z.string().optional(),
    birthDay: z.string(),
    createdAt: z.string(),
    isActive: z.boolean(),
});
export type CreateUserInput = {
    id: number;
    name: string;
    bibliography?: string;
    password: string;
    phone: string;
    email: string;
    userName: string;
    location?: string;
    webSite?: string;
    birthDay: string;
    createdAt: string ;
    isActive: boolean;
};
export const updateUserInputSchema= z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    bibliography: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid mail format').optional(),
    userName: z.string().optional(),
    location: z.string().optional(),
    webSite: z.string().optional(),
    birthDay: z.string().optional(),
    createdAt: z.string().optional(),
    isActive: z.boolean().optional(),
})
export type UpdateUserInput ={
    id?: number;
    name?: string;
    bibliography?: string;
    password?: string;
    phone?: string;
    email?: string;
    userName?: string;
    location?: string;
    webSite?: string;
    birthDay?: string;
    createdAt?: string ;
    isActive?: boolean;
}