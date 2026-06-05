"use client";

import * as React from "react";
import PhoneInputLib, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CustomPhoneInputProps {
    value?: string;
    onChange?: (value?: string) => void;
    className?: string;
    placeholder?: string;
}

/**
 * A Shadcn-styled wrapper around react-phone-number-input
 */
export const CustomPhoneInput = React.forwardRef<HTMLInputElement, CustomPhoneInputProps>(
    ({ className, value, onChange, placeholder = "Enter phone number", ...props }, ref) => {
        return (
            <PhoneInputLib
                ref={ref as any}
                international
                defaultCountry="KE"
                flags={flags}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                inputComponent={Input as any}
                className={cn("flex w-full items-center", className)}
                {...props}
            />
        );
    }
);

CustomPhoneInput.displayName = "PhoneInput";
