"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import CustomButton from '../ui/custom-button';
import { MessageCircleMore, Star } from 'lucide-react';
import * as z from "zod";
import { reviewSchema } from '@/lib/validations/all-validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '../ui/custom-form-field';
import { FieldGroup } from '../ui/field';
import { useSession } from 'next-auth/react';
import { ApiRequests } from '@/lib/requests/api-requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ReviewModalProps {
    providerId: string;
    providerType: string;
}

const ReviewModalForm = ({ providerId, providerType }: ReviewModalProps) => {

    const [ hover, setHover ] = useState(0);
    const [ rating, setRating ] = useState(0);

    const { data:session } = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: ""
        }
    });
    const { isSubmitting } = form.formState;


    

    const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
        try{

            const formData = new FormData();
            formData.append("rating", values.rating.toString());
            formData.append("provider_type", providerType);
            formData.append("provider_id", providerId);
            if(values.comment){
                formData.append("comment", values.comment);
            }

            const response = await ApiRequests.post("reviews/my_reviews/", formData, session?.accessToken);
            if(response.success){
                toast.success(response.message);
                router.push("/dashboard/patient/reviews/");
            } else {
                toast.error(response.errors);
            }
        } catch(err) {
            toast.error("A network error occured, " + err);
        }
    }

    const onError = (errors: any) => {
        console.log(errors);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton 
                    label="Leave a Review"
                    btnType="button"
                    suffixIcon={{ type: "lucide", icon: MessageCircleMore }}
                    variant="secondary"
                />
            </DialogTrigger>
            <DialogContent className="w-[75vw] max-w-[75vw] sm:max-w-lg md:max-w-xl lg:max-w-xl rounded-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-secondary">Leave a review</DialogTitle>
                    <DialogDescription>A review helps other patients make informed decision, please be as honest as possible.</DialogDescription>
                </DialogHeader>
                <div>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <FieldGroup>

                            <div className="mx-auto">
                                <div className="flex flex-wrap gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => {
                                                setRating(star);
                                                form.setValue("rating", star, {
                                                    shouldValidate: true,
                                                });
                                            }}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{
                                                cursor: "pointer",
                                                color: star <= (hover || rating) ? "#FFD700" : "#CCCCCC",
                                            }}
                                        >
                                            
                                            <Star size={28} />
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <CustomFormField
                                fieldType="textarea"
                                name="comment"
                                control={form.control}
                                placeholder="Enter your comment here ...."
                            />
                        </FieldGroup>
                        <div className="mt-3">
                            <CustomButton 
                                label="Submit"
                                btnType="submit"
                                isLoading={isSubmitting}
                                loadingText="Sending...."
                                variant="secondary"
                            />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewModalForm