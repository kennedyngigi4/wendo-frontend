import * as z from "zod";

export const professionalSchema = z.object({ 
    name: z.string().min(2, "Your name is required."),
    title: z.string().min(2, "Title is required."),
    licenseNumber: z.string().min(2, "License number is required."),
    bio: z.string().min(100, "Bio is required."),
    profession: z.string().min(2, "Your profession is required."),
    specialties: z.array(z.string()).min(1, "Select at least one specialty"),
    yearsOfExperience: z.string().min(1, "Years of experience required."),
    fee: z.string().min(2, "Consultancy fee is required."),
    gender: z.string().min(2, "Gender is required."),
    phone: z.string().min(2, "Phone number is required."),
    email: z.email("Enter a valid email address."),
    website: z.string().optional(),

    country: z.string().min(2, "Country is required"),
    location_name: z.string().min(3, "Location is required"),
    latitude: z.string().min(3, "Ensure you selected location."),
    longitude: z.string().min(3, "Ensure you selected location."),

    consultationTypes: z.array(z.string()).optional(),

    introductionVideoUrl: z.string().optional().refine((url) => {

        if (!url) return true;

        return (
            url.includes("youtube.com") ||
            url.includes("youtu.be") ||
            url.includes("tiktok.com") ||
            url.includes("facebook.com") ||
            url.includes("vimeo.com")
        );

    }, {
        message:
            "Please enter a valid YouTube, TikTok, Facebook, or Vimeo link.",
    }),

})



export const filterSchema = z.object({
    specialty: z.string(),
    price: z.string(),
    specialties: z.string(),
    experience: z.string(),
    location: z.string(),
}) 


export const EducationSchema = z.object({
    degree: z.string(),
    institution: z.string(),
    year_completed: z.string(),
})


export const WorkingHoursSchema = z.object({
    working_hours: z
        .array(
            z
                .object({
                    day: z.string(),
                    from_time: z.string().optional(),
                    to_time: z.string().optional(),
                    is_closed: z.boolean().default(false),
                    is_24: z.boolean().default(false),
                })
                .refine(
                    (data) => {
                        if (data.is_closed || data.is_24) return true;

                        if (!data.from_time || !data.to_time) return false;

                        return data.from_time < data.to_time;
                    },
                    {
                        message: "Closing time must be after opening time",
                        path: ["to_time"],
                    }
                )
        )
        .min(1),
});





