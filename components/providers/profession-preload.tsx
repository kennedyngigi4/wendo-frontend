"use client"

import React, { useEffect } from 'react';
import { useProfessionStore } from '@/stores/profession-store';



const ProfessionPreload = () => {
    const fetchData = useProfessionStore((state) => state.fetchData);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return null;
}

export default ProfessionPreload