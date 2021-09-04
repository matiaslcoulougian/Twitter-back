import * as z from 'zod';

export const createUserInputSchema = z.object({
    name: z.string(),
    bibliography: z.string().optional(),
    password: z.string(),
    phone:z.string(),
    mail: z.string().email('Invalid mail format'),
    userName: z.string(),
    location: z.string().optional(),
    webSite: z.string().optional(),
    birthDate: z.string(),
});
export type CreateUserInput = {
    name: string;
    bibliography?: string;
    password: string;
    phone: string;
    mail: string;
    userName: string;
    location?: string;
    webSite?: string;
    birthDate: string;
};
export const updateUserInputSchema= z.object({
    name: z.string().optional(),
    bibliography: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    mail: z.string().email('Invalid mail format').optional(),
    location: z.string().optional(),
    webSite: z.string().optional(),
    birthDate: z.string().optional(),
    isActive: z.boolean().optional(),
})
export type UpdateUserInput ={
    name?: string;
    bibliography?: string;
    password?: string;
    phone?: string;
    mail?: string;
    userName?: string;
    location?: string;
    webSite?: string;
    birthDate?: string;
    isActive?: boolean;
}