import * as z from "zod";

export const serviceSchema = z.object({
    serviceCategory: z.string().min(2, "Service is required."),
    price: z.string().optional(),
    isAvailable: z.string(),
    description: z.string().min(1, "Service description is required"),
    service: z.string().min(1, "Select at least one service"),
})



export const reviewSchema = z.object({
    rating: z.string().min(1, "Please leave a rating"),
    comment: z.string().optional(),
})


