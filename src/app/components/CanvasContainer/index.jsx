"use client"
import styles from './index.module.css';

import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
import { useIsMobile } from "@/hooks/useIsMobile";
import Engine from "@/lib/Engine";


export default function CanvasContainer () {
    const canvasRef = useRef(null);
    const pathname = usePathname();
    const engineRef = useRef(null);
    const isInitializedRef = useRef(false);
    const isMobile = useIsMobile();
    
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        if (!canvasRef.current ) return;

        let isCleanedUp = false;

        const initEngine = async () => {
            try {
                engineRef.current = new Engine(canvasRef.current, isMobile, true);

                await engineRef.current.init();

                if(!isCleanedUp) {
                    isInitializedRef.current = true;
                    engineRef.current.loadScene(pathname);
                    setIsLoading(false);
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


    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;
        engineRef.current.loadScene(pathname);
    }, [pathname])

    
    return (
        <>
            <div className={`${styles.loadingOverlay} ${isLoading ? styles.visible : styles.hidden}`}>
                <div className={styles.spinner}></div>
            </div>
            
            <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full block"></canvas>
        </>
    )
}