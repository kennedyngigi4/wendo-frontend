"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import CustomButton from '@/components/ui/custom-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const ProviderOnboarding = ({ open } : { open: boolean }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(open);

    const handleNavigate = async(path: string) => {
        router.push(path);

        setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };

  return (
    <Dialog open={isOpen}>
        <DialogContent className="md:min-w-3xl w-full md:min-h-[300px]" 
                showCloseButton={false}
              onEscapeKeyDown={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => e.preventDefault()}
        >
            <DialogHeader>
                <DialogTitle className="text-2xl text-primary font-extrabold">Welcome to Wendo Health</DialogTitle>
                
            </DialogHeader>

            <p className="font-semibold">Choose the account type you want to create.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col space-y-6 p-4 border rounded-xl">
                    <h3 className="text-lg font-semibold text-secondary">👤 Professional Profile</h3>
                    <p className="text-sm text-muted-foreground">Set up your personal healthcare profile to showcase your expertise,
                          qualifications, and services to patients.</p>
                    
                    <CustomButton 
                        label="Create Profile" 
                        btnType="button" 
                        className="hover:bg-secondary"
                        onClick={() => handleNavigate("/dashboard/provider/professional/new")}
                    />
                    
                </div>

                <div className="flex flex-col space-y-6 p-4 border rounded-xl">
                    <h3 className="text-lg font-semibold text-secondary">🏥 Organization</h3>
                    <p className="text-sm text-muted-foreground">Create or manage a hospital or clinic, add departments, staff,
                          and make your services discoverable on Wendo Health.</p>
                    <CustomButton
                        label="Create Organization"
                        btnType="button"
                        className="hover:bg-secondary"
                        onClick={() => handleNavigate("/dashboard/provider/organizations/new")}
                    />
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProviderOnboarding