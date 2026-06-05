"use client";

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Search } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { extractSearchKeywords } from '@/lib/helpers/search-text-cleaner';

const HomeSearch = () => {

    const router = useRouter();
    const [query, setQuery] = useState("");
    const recognitionRef = useRef(null);

    const startListening = () => {
        if(!("webkitSpeechRecognition" in window)){
            toast.error("Your browser does not support speech recognition.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = "en-US"; 
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setQuery(spokenText);
            console.log("Recognized:", spokenText);
            

            const optimizedQuery = extractSearchKeywords(spokenText);

            router.push(`/search?q=${encodeURIComponent(optimizedQuery)}`);
        };

        recognition.onerror = (event) => {
            toast.error("Speech recognition error ", event.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
    }

    const handleSearch = async() => {
        if(!query.trim()){
            toast.error("Please enter a search term");
            return;
        }

        const optimizedQuery = extractSearchKeywords(query);

        router.push(`/search/?q=${encodeURIComponent(optimizedQuery)}`);
    }

    return (
        <section className="app-container md:w-[60%] rounded-3xl bg-primary shadow relative z-20 -mt-40">
            <div className="flex items-center  text-white">
                <div className="w-1/2 py-10">
                    <h1 className="text-2xl text-white">OPEN DOOR TO</h1>
                    <h1 className="text-3xl font-bold">BETTER HEALTH</h1>
                    <p className="py-5">Online consultation</p>
                    <Button variant="secondary" className="cursor-pointer">Book Appointment</Button>
                </div>
                <div className="relative w-[400px] h-[250px] w-1/2">
                    <Image src="/assets/images/others/search.png" alt="Afyhub" fill className="object-cover" />
                </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[80%] shadow-xl bg-white rounded-2xl h-[50px] flex justify-center items-center">
                <div className="relative w-full me-2">
                    <Input 
                        type="text" 
                        className="bg-white py-5 border-0 ms-1.5 focus:outline-none focus:ring-0 focus:border-0 focus-visible:ring-0 !ring-0 !outline-none" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        placeholder="Search Doctors, Hospitals, Clinics, Laboratory, Chemist" />
                    <div title="Search by voice">
                        <Mic className="text-slate absolute hover:cursor-pointer right-0 top-2 text-slate-500 z-50 bg-white" onClick={startListening} />
                    </div>
                </div>
                
                <button onClick={handleSearch}>
                    <div className="bg-secondary hover:bg-afyblue hover:cursor-pointer py-3 px-3 me-1 my-1 rounded-e-xl">
                        <Search className='text-white'/>
                    </div>
                </button>
            </div>
        </section>
    )
}

export default HomeSearch