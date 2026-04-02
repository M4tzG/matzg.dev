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
        if (engineRef.current && typeof engineRef.current.enableGyroscope === 'function') {
            engineRef.current.enableGyroscope();
        }
    };


    // ==============================================================
    useEffect (() => {
        if (!canvasRef.current ) return;

        let isCleanedUp = false;

        const initEngine = async () => {
            try {
                engineRef.current = new Engine(canvasRef.current, isMobile, true);

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
    }, [isMobile]);


    // ==============================================================
    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;

        if (pathname === '/projects') {
            engineRef.current.sleep();
            setIsCanvasVisible(false);
        } 
        else if (pathname === '/') {
            setIsCanvasVisible(true);
            engineRef.current.wake();
            engineRef.current.initScene(isMobile ? mobileData : desktopData); 
        }
    }, [pathname]);


    // ==============================================================
    useEffect(() => {
        const handleTransitionEvent = async (e) => {
            if (!engineRef.current) return;

            await engineRef.current.triggerTransition(2000);

            if (e.detail && typeof e.detail.onComplete === 'function') {
                e.detail.onComplete();
            }
        };

        window.addEventListener('start-canvas-transition', handleTransitionEvent);
        return () => window.removeEventListener('start-canvas-transition', handleTransitionEvent);
    }, []);


    // ==============================================================
    return {
        canvasRef,
        isLoading,
        isCanvasVisible,
        handleActivateGyro
    };
}