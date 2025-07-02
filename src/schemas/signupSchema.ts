import {z}  from 'zod';

export const userValidation = z
.string()
.min(2,'username must be atleast 2 chracters')
.max(20,'username must be no more than 20 characters')
.regex(/^[a-zA-Z0-9_]+$/,'Username must not contain special character')



export const signUpSchema = z.object({
    username: userValidation,
    email: z.string().email({message:'Invalid email'}),
    password: z.string().min(6,{message:'Password must be atleast 6 characters'}),
    
})
