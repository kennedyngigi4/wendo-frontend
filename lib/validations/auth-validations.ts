import * as z from "zod";

export const registerSchema = z.object({
    email: z.email("Enter a valid email address."),
    fullname: z.string().min(2, "Full name is required."),
    phone: z.string().min(8, "Phone number is required."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    terms: z.boolean().refine((value) => value === true, {
            message: "You must agree to the Terms & Conditions",
        }),
    marketingConsent: z.boolean().optional(),
});



export const loginSchema = z.object({
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
})


export const forgotPasswordSchema = z.object({
    email: z.email("Enter a valid email address."),
})



export const resetPasswordSchema = z.object({
    password1: z.string().min(8, "Password must be at least 8 characters."),
    password2: z.string().min(8, "Password must be at least 8 characters."),
})


