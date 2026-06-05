import * as z from "zod";



export const patientBookingSchema = z.object({
    name: z.string().min(2, "Full name is required."),
    email: z.email(),
    phone: z.string().min(2, "Phone number is required."),
    appointment_datetime: z.date({ error: "Appointment time is required" }),
    service: z.string().min(1, "Service is required"),
    reason: z.string().optional(),
})


export const providerBookingSchema = z.object({
    name: z.string().min(2, "Full name is required."),
    email: z.email(),
    phone: z.string().min(2, "Phone number is required."),
    appointment_datetime: z.string().optional(),
    service: z.string().min(1, "Service is required"),
    reason: z.string().optional(),
    status: z.string().optional(),
})



export const bookingStatusUpdateSchema = z.object({
    status: z.string().min(1),
});


