"use client";

import React from 'react';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Control, Controller } from "react-hook-form"
import { FormFieldType } from '@/lib/helpers/form-field-types';
import { CustomPhoneInput } from './custom-phone-input';
import { Select, SelectContent, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import { DateTimePicker } from './custom-datetime-picker';
import { Checkbox } from './checkbox';

interface CustomFormFieldProps {
    fieldType: string,
    inputType?: string,
    name: string,
    control: Control<any>,
    label?: string,
    placeholder?: string,
    description?: string,
    children?: React.ReactNode,
    disabled?: boolean,
}

const RenderField = ({ field, state, props }: { field: any, state: any, props: CustomFormFieldProps}) => {
    
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            
            return(
                <Input 
                    {...field}
                    type={props.inputType}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
            );
    
        case FormFieldType.PHONE:
            return (
                <CustomPhoneInput onChange={field.onChange} />
            );

        case FormFieldType.SELECT:
            return (
                <Select key={field.value} value={field.value || ""} onValueChange = {(val) => field.onChange(val)}>
                    <SelectTrigger>
                        <SelectValue placeholder={props.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {props.children}
                    </SelectContent>
                </Select>
            );

        case FormFieldType.TEXTAREA:
            return(
                <Textarea {...field} placeholder={props.placeholder} disabled={props.disabled} />
            );

        case FormFieldType.DATETIME:
            return(
                <DateTimePicker 
                    value={field.value}
                    onChange={field.onChange}
                />
            );

        case FormFieldType.CHECKBOX:
            return(
                <FieldGroup className="mx-auto w-56">
                    <Field orientation="horizontal">
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={props.disabled}
                        />
                        {props.placeholder && (
                            <FieldLabel className="text-slate-500 font-normal" htmlFor="terms-checkbox-invalid">
                                {props.placeholder}
                            </FieldLabel>
                        )}
                    </Field>
                </FieldGroup>
            );
    }
}

const CustomFormField = (props : CustomFormFieldProps) => {

    const { fieldType, name, control, label, placeholder, description, children, disabled } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    {label && (
                        <FieldLabel htmlFor={name}>
                            {label}
                        </FieldLabel>
                    )}
                    
                    <RenderField props={props} state={fieldState} field={field} />

                    {description && (
                        <FieldDescription className="text-xs">
                            {description}
                        </FieldDescription>
                    )}
                    
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}

export default CustomFormField