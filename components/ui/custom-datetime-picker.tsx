"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DateTimePickerProps {
    value?: string;
    onChange: (value: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
   
    const [date, setDate] = React.useState<Date | undefined>(
        undefined
    );

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (!selectedDate) return;
        const updated = new Date(date || new Date());
        updated.setFullYear(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
        );
        setDate(updated);
        onChange(updated);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [hours, minutes] = e.target.value.split(":").map(Number);

        const updated = new Date(date || new Date());
        updated.setHours(hours);
        updated.setMinutes(minutes);

        setDate(updated);
        onChange(updated);
    };

    return (
        <div className="flex gap-2">
            {/* Date Picker */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={handleDateChange} 
                        disabled={(date) => date < new Date()}
                    />
                </PopoverContent>
            </Popover>

            {/* Time Picker */}
            <input
                type="time"
                className="border rounded px-2"
                onChange={handleTimeChange}
            />
        </div>
    );
}