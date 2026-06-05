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

interface ReviewModalProps {

}

const ReviewModalForm = ({ }: ReviewModalProps) => {

    const [ hover, setHover ] = useState(0);
    const [ rating, setRating ] = useState(0);

    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: "",
            comment: ""
        }
    });
    const { isSubmitting } = form.formState;


    

    const onSubmit = async (values: z.infer<typeof reviewSchema>) => {

    }

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
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>

                            <div className="mx-auto">
                                <div className="flex flex-wrap gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
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