'use client'
import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 1024) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect( () => {
        const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
        handleResize();

        const listener = handleResize;
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [breakpoint]);

    return isMobile;
}