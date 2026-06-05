import { CardDescription } from "@/components/ui/card";
import z from "zod";

export const providerSchema = z.object({
    name: z.string().min(2, "Name is required."),
    type: z.string().min(2, "Provider type is required."),

    country: z.string("Country is required"),
    description: z.string().min(10, "Description is required"),

    email: z.email("Enter a valid email address.").optional(),
    website: z.string().optional(),
})


export const providerBranchSchema = z.object({
    name: z.string().min(2, "Name is required."),

    phone: z.string().min(8, "Phone number is required."),
    emergencyPhone: z.string().optional(),

    email: z.string().optional(),
    location_name: z.string().min(8, "Physical address is required."),
    latitude: z.string(),
    longitude: z.string(),

    isMainBranch: z.string().optional(),
})



export const hospitalFilterSchema = z.object({
    ownership: z.string(),
    level: z.string(),
    location: z.string(),
    services: z.string(),
})



export const clinicFilterSchema = z.object({
    location: z.string(),
    services: z.string(),
})


export const specialistSchema = z.object({
    title: z.string().min(1, "Title is required."),
    name: z.string().min(1, "Name is required."),
    profession: z.string().min(1, "Profession is required."),
    specialties: z.array(z.string()).optional(),
    bio: z.string().optional(),
})


export const clinicSchema = z.object({
    title: z.string().min(1, "Title is required."),
    consultation_fee: z.string().optional(),
    specialists: z.array(z.string()).default([]),
    days_of_week: z.array(z.string()).default([]),
    start_time: z.string().min(1, "Start time is required."),
    end_time: z.string().min(1, "End time is required."),
    description: z.string().optional(),
})



export const hospitalSettingsSchema = z.object({
    ownership_type: z.string().optional(),
    level: z.string().optional(),
    accepts_nhif: z.string().optional(),
    year_established: z.string().optional(),
    has_pharmacy: z.string().optional(),
    total_beds: z.string().optional(),
    icu_beds: z.string().optional(),
    has_emergency: z.string().optional(),
    has_ambulance: z.string().optional(),
    trust_reasons: z.array(z.string()).optional(),
})


