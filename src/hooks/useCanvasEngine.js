'use client'

import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
// Removendo a dependência do hook de estado aqui para evitar re-renders do canvas
import { desktopData } from "@/scenes/desktop";
import { mobileData } from "@/scenes/mobile";
import { assets } from "@/scenes/assets";
import Engine from "@/lib/Engine";

export const useCanvasEngine = () => {
    const engineRef = useRef(null);
    const canvasRef = useRef(null);
    const isInitializedRef = useRef(false);

    const pathname = usePathname();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isCanvasVisible, setIsCanvasVisible] = useState(pathname === '/');

    const handleActivateGyro = () => {
        if (engineRef.current && engineRef.current.enableGyroscope) {
            engineRef.current.enableGyroscope();
        }
    };

    // ==============================================================
    // 1. Inicializa o Engine UMA ÚNICA VEZ
    // ==============================================================
    useEffect (() => {
        if (!canvasRef.current || isInitializedRef.current) return;

        let isCleanedUp = false;

        const initEngine = async () => {
            try {
                // Checamos se é mobile de forma imperativa, sem depender de estado do React
                const checkIsMobile = window.innerWidth <= 1024;

                engineRef.current = new Engine(canvasRef.current, { device: { isMobile: checkIsMobile } });

                await engineRef.current.init(assets());

                if(!isCleanedUp) {
                    isInitializedRef.current = true;
                    
                    const aspect = window.innerWidth / window.innerHeight;
                    const sceneData = checkIsMobile ? mobileData(aspect) : desktopData(aspect);
                    
                    engineRef.current.initScene(sceneData);
                    setIsLoading(false);
                    
                    if (checkIsMobile && (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function')) {
                        engineRef.current.enableGyroscope();
                    }
                }
            } catch (error){
                console.error("Erro na inicializacao:", error);
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
    }, []); // <-- Array vazio! O WebGL só é montado e desmontado se o componente sumir de vez.

    // ==============================================================
    // 2. Lida com navegação entre páginas
    // ==============================================================
    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;
        
        if (pathname === '/') {
            setIsCanvasVisible(true);
            
            if (!engineRef.current.currentScene){
                const checkIsMobile = window.innerWidth <= 1024;
                const aspect = window.innerWidth / window.innerHeight;
                
                // CORREÇÃO AQUI: Antes você estava passando a função pura "mobileData", 
                // sem os parênteses (), o que causava um erro silencioso.
                engineRef.current.initScene(checkIsMobile ? mobileData(aspect) : desktopData(aspect)); 
            } else {
                engineRef.current.wake();
            }
            
        } else {             
            engineRef.current.sleep();
            setIsCanvasVisible(false);
        }
    }, [pathname]);

    return {
        canvasRef,
        isLoading,
        isCanvasVisible,
        handleActivateGyro
    };
}