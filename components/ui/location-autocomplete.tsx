"use client";

import {
    Autocomplete,
    LoadScript,
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { Input } from "./input";

interface LocationValue {
    location_name: string;
    latitude: number;
    longitude: number;
    country_code?: string;
    place_id?: string;
}

interface LocationAutocompleteProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange: (data: LocationValue) => void;

    // Easy expansion later
    countries?: string[];

    className?: string;
}

const libraries: ("places")[] = ["places"];

const LocationAutocomplete = ({
    label,
    placeholder,
    onChange,
    countries = ["ke"],
    className,
}: LocationAutocompleteProps) => {

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const [inputValue, setInputValue] = useState("");

    const onLoad = (
        autocomplete: google.maps.places.Autocomplete
    ) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {

        if (!autocompleteRef.current) return;

        const place = autocompleteRef.current.getPlace();

        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();

        const countryComponent = place.address_components?.find(
            (component) => component.types.includes("country")
        );

        const countryCode = countryComponent?.short_name;

        const payload = {
            location_name: place.formatted_address || place.name || "",
            latitude: lat || 0,
            longitude: lng || 0,
            country_code: countryCode,
            place_id: place.place_id,
        };

        setInputValue(payload.location_name);

        onChange(payload);
    };

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            libraries={libraries}
        >
            <div className="space-y-2">

                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}

                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                        componentRestrictions: {
                            country: countries,
                        },
                        fields: [
                            "formatted_address",
                            "geometry",
                            "name",
                            "place_id",
                            "address_components",
                        ],
                    }}
                >
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={placeholder || "Search location"}
                        className={`w-full h-8.5 rounded-lg border border-gray-300 px-4 outline-none
                                    focus:ring-2 focus:ring-secondary ${ className }
                                    `}
                    />
                </Autocomplete>
            </div>
        </LoadScript>
    );
};

export default LocationAutocomplete;
