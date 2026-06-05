"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Copy } from "lucide-react";

import CustomFormField from "@/components/ui/custom-form-field";
import CustomButton from "@/components/ui/custom-button";
import { CONSTANTS } from "@/lib/constants/constants";
import { ApiRequests } from "@/lib/requests/api-requests";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { WorkingHoursSchema } from "@/lib/validations/professional-validations";


interface OperatingHoursClientPageProps {
    professionalId?: string
    data?: any;
}

const OperatingHoursClientPage = ({ professionalId, data }: OperatingHoursClientPageProps) => {

    const {data:session} = useSession();
    const form = useForm<z.infer<typeof WorkingHoursSchema>>({
        resolver: zodResolver(WorkingHoursSchema),
        defaultValues: {
            working_hours: CONSTANTS.weekDays.map((day) => {

                const existingDay = data?.find(
                    (item: any) =>
                        Number(item.day_of_week) === Number(day.id)
                );

                return {
                    day: day.id,
                    from_time: existingDay?.open_time
                        ? existingDay.open_time.slice(0, 5)
                        : "",

                    to_time: existingDay?.close_time
                        ? existingDay.close_time.slice(0, 5)
                        : "",

                    is_closed: existingDay?.is_closed || false,
                    is_24: existingDay?.is_24 || false,
                };
            }),
        },
    });

    const { isSubmitting } = form.formState;

    const workingHours = useWatch({
        control: form.control,
        name: "working_hours",
    });

    const copyMondayToAll = () => {
        const monday = workingHours?.[0];

        if (!monday) return;

        const updated = workingHours.map((day) => ({
            ...day,
            from_time:
                monday.is_closed || monday.is_24
                    ? ""
                    : monday.from_time,

            to_time:
                monday.is_closed || monday.is_24
                    ? ""
                    : monday.to_time,

            is_closed: monday.is_closed,
            is_24: monday.is_24,
        }));

        form.setValue("working_hours", updated);
    };

    const onSubmit = async (values: FormValues) => {
        try{
            let resp;
            
            if(data){
                resp = await ApiRequests.post("professionals/working_hours/", values, session?.accessToken);
            } else {
                resp = await ApiRequests.patch("professionals/working_hours/", values, session?.accessToken);
            }

            
            if(resp.success){
                toast.success(resp.message);
            } else {
                toast.error(resp.message);
            }

        } catch(err) {
            toast.error("A network error occured.")
        }
    };

    return (
        <div className="bg-white p-5 shadow rounded-lg my-5">

            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="font-semibold text-secondary text-lg">
                        Working Hours
                    </h1>
                    <p className="text-sm text-slate-500">Set your working hours here and patients can see your availability.</p>
                </div>

                <button
                    type="button"
                    onClick={copyMondayToAll}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
                >
                    <Copy size={16} />
                    Copy Monday to All
                </button>
            </div>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {CONSTANTS.weekDays.map((weekD, index) => {
                    const currentDay = workingHours?.[index];

                    return (
                        <div
                            key={weekD.id}
                            className="border rounded-xl p-4"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">

                                {/* Day */}
                                <div>
                                    <p className="font-medium">
                                        {weekD.name}
                                    </p>
                                </div>

                                {/* From */}
                                <div>
                                    <CustomFormField
                                        fieldType="input"
                                        control={form.control}
                                        name={`working_hours.${index}.from_time`}
                                        label="From"
                                        inputType="time"
                                        disabled={
                                            currentDay?.is_closed ||
                                            currentDay?.is_24
                                        }
                                    />
                                </div>

                                {/* To */}
                                <div>
                                    <CustomFormField
                                        fieldType="input"
                                        control={form.control}
                                        name={`working_hours.${index}.to_time`}
                                        label="To"
                                        inputType="time"
                                        disabled={
                                            currentDay?.is_closed ||
                                            currentDay?.is_24
                                        }
                                    />
                                </div>

                                {/* Closed */}
                                <div>
                                    <CustomFormField
                                        fieldType="checkbox"
                                        control={form.control}
                                        name={`working_hours.${index}.is_closed`}
                                        label="Closed"
                                        disabled={currentDay?.is_24}
                                    />

                                </div>

                                {/* 24 Hours */}
                                <div>
                                    <CustomFormField
                                        fieldType="checkbox"
                                        control={form.control}
                                        name={`working_hours.${index}.is_24`}
                                        label="24 Hours"
                                        disabled={currentDay?.is_closed}
                                    />
                                </div>

                            </div>

                            {/* 24 Hours Badge */}
                            {currentDay?.is_24 && (
                                <div className="mt-3">
                                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                                        Open 24 Hours
                                    </span>
                                </div>
                            )}

                            {/* Closed Badge */}
                            {currentDay?.is_closed && (
                                <div className="mt-3">
                                    <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                                        Closed
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="w-full py-4">
                    <CustomButton
                        label="Save Operating Hours"
                        btnType="submit"
                        variant="secondary"
                        className="px-12 py-4.5"
                        suffixIcon={{ type: "lucide", icon: Send }}
                        isLoading={isSubmitting}
                        loadingText="Processing ..."
                    />
                </div>
            </form>
        </div>
    );
};

export default OperatingHoursClientPage;