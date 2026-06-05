"use client";

import React from 'react';
import { Button } from './button';
import { Spinner } from './spinner';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type IconType =
  | { type: "lucide"; icon: LucideIcon }
  | { type: "fa"; icon: IconDefinition }

interface CustomButtonProps {
  label: string;
  btnType: "submit" | "button" | "reset";
  prefixIcon?: IconType;
  suffixIcon?: IconType;
  size?: "xs" | "sm" | "lg" | "icon" | "default" | "icon-xs" | "icon-sm";
  variant?: "default" | "destructive" | "secondary" | "link" | "ghost" | "white" | "outline";
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
  onClick?: () => void;
}

const CustomButton = ({ btnType, label, size, variant, prefixIcon, suffixIcon, isLoading, loadingText, onClick, className}: CustomButtonProps) => {

  const Icon = prefixIcon;

  return (
    <Button type={btnType} size={size} variant={variant} disabled={isLoading} onClick={onClick} className={cn("py-4.5 px-8 cursor-pointer", className)}>
      {isLoading 
        ? (<div className="flex items-center space-x-1">
          <Spinner /> 
          <span>{loadingText}</span>
        </div>) 
        : (
          <div className="flex items-center gap-2 group">

            {/* ICON HANDLER */}
            {prefixIcon?.type === "lucide" && (
              <prefixIcon.icon className="transition-transform duration-200 group-hover:translate-x-1" />
            )}

            {prefixIcon?.type === "fa" && (
              <FontAwesomeIcon
                icon={prefixIcon.icon}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            )}

            {label}

            {/* SUFFIX ICON HANDLER */}
            {suffixIcon?.type === "lucide" && (
              <suffixIcon.icon className="transition-transform duration-200 group-hover:translate-x-1" />
            )}

            {suffixIcon?.type === "fa" && (
              <FontAwesomeIcon
                icon={suffixIcon.icon}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            )}
          </div>
        )
      }
    </Button>
  )
}

export default CustomButton