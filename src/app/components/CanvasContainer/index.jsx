"use client"

import Engine from "@/lib/Engine";

import { useEffect, useRef } from "react";
import { usePathname } from 'next/navigation'

const checkIsMobile = () => {
    const isSmallScreen = window.innerWidth <= 1024;
    // const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return isSmallScreen;
};



export default function CanvasContainer () {
    const canvasRef = useRef(null);
    const pathname = usePathname();
    const engineRef = useRef(null);
    const isInitializedRef = useRef(false);
    const isMobile = useRef(false);


    useEffect ( () => {
        if (!canvasRef.current ) return;

        isMobile.current = checkIsMobile();

        engineRef.current = new Engine(canvasRef.current, isMobile.current, true);

        // console.log(pathname)
        engineRef.current.init().then(() => {
            isInitializedRef.current = true;
            engineRef.current.loadScene(pathname);
        }).catch((error) => {
            console.error("erro inicializacao:", error);
        });
        

    }, [])

    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;

        engineRef.current.loadScene(pathname);
    }, [pathname])

    return (
        <canvas ref={canvasRef} className="fixed inset-0 z-0 object-cover"></canvas>
    )
}
