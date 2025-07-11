import { NextRequest } from "next/server";
import z from "zod";

export async function SignupValidation(req: NextRequest) {
    const signupSchema = z.object({
        fullname: z.object({
            firstname: z.string({ message: "Firstname is required!" }),
            lastname: z.string().optional(),
        }),
        email: z.string({ message: "Email required!" }).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, { message: "Invalid email format" }),
        password: z.string({ message: "Password required!" }).min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must be at most 20 characters long" })
    });
    return signupSchema.safeParse(await req.json());
}

export async function SigninValidation(req: NextRequest) {
    const signinSchema = z.object({
        email: z.string({ message: "Email required!" }).regex(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, { message: "Invalid email format" }),
        password: z.string({ message: "Password required!" }).min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must be at most 20 characters long" })
    });
    return signinSchema.safeParse(await req.json());
}