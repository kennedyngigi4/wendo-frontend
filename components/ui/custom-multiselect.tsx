"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { SpecialtyModel } from "@/lib/models/service-models"


interface MultiSelectProps {
    options: any[]
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
}

export function CustomMultiSelect({
    options,
    value,
    onChange,
    placeholder = "Select options",
}: MultiSelectProps) {
    const toggle = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter((v) => v !== id))
        } else {
            onChange([...value, id])
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between"
                >
                    {value.length > 0
                        ? `${value.length} selected`
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem
                                key={option.id}
                                onSelect={() => toggle(option.id)}
                            >
                                <Checkbox
                                    checked={value.includes(option.id)}
                                    className="mr-2"
                                />
                                {option.name}

                                {value.includes(option.id) && (
                                    <Check className="ml-auto h-4 w-4" />
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}





