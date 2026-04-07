'use client'

import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
import { useIsMobile } from "@/hooks/useIsMobile";
import { desktopData } from "@/scenes/desktop";
import { mobileData } from "@/scenes/mobile";
import { assets } from "@/scenes/assets";
import Engine from "@/lib/Engine";

export const useCanvasEngine = () => {


    const engineRef = useRef(null);
    const canvasRef = useRef(null);
    const isInitializedRef = useRef(false);

    const pathname = usePathname();
    const isMobile = useIsMobile();
    
    
    const [isLoading, setIsLoading] = useState(true);
    const [isCanvasVisible, setIsCanvasVisible] = useState(pathname === '/');


    // ==============================================================
    const handleActivateGyro = () => {
        if (engineRef.current) {
            engineRef.current.enableGyroscope();
        }
    };


    // ==============================================================
    useEffect (() => {
        if (!canvasRef.current ) return;

        let isCleanedUp = false;

        const initEngine = async () => {
            try {
                engineRef.current = new Engine(canvasRef.current, {isMobile: isMobile});

                await engineRef.current.init(assets());

                if(!isCleanedUp) {
                    isInitializedRef.current = true;
                    engineRef.current.initScene(isMobile ? mobileData : desktopData);
                    setIsLoading(false);
                    if (isMobile && (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function')) {
                        engineRef.current.enableGyroscope();
                    }
                }
            } catch (error){
                console.error("erro inicializacao:", error);
                if (!isCleanedUp) setIsLoading(false);
            }
        };

        initEngine();

        return () => {
            isCleanedUp = true;
            if (engineRef.current?.dispose){
                engineRef.current.dispose();
            }
        }
    }, []);


    // ==============================================================

    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;
        if (pathname === '/') {
            setIsCanvasVisible(true);
            engineRef.current.wake();
            engineRef.current.initScene(isMobile ? mobileData : desktopData); 
        } else {             
            engineRef.current.sleep();
            setIsCanvasVisible(false);
        }
    }, [pathname]);

    // ==============================================================
    return {
        canvasRef,
        isLoading,
        isCanvasVisible,
        handleActivateGyro
    };
}