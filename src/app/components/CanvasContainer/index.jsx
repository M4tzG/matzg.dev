"use client"

import Engine from "@/lib/Engine";
import { useEffect, useRef, useState } from "react"; // <-- Adicionado useState
import { usePathname } from 'next/navigation'

const checkIsMobile = () => {
    const isSmallScreen = window.innerWidth <= 1024;
    return isSmallScreen;
};

export default function CanvasContainer () {
    const canvasRef = useRef(null);
    const pathname = usePathname();
    const engineRef = useRef(null);
    const isInitializedRef = useRef(false);
    const isMobile = useRef(false);
    
    // 1. Criar o estado de carregamento (começa como true)
    const [isLoading, setIsLoading] = useState(true);

    useEffect ( () => {
        if (!canvasRef.current ) return;

        isMobile.current = checkIsMobile();
        engineRef.current = new Engine(canvasRef.current, isMobile.current, true);

        engineRef.current.init().then(() => {
            isInitializedRef.current = true;
            engineRef.current.loadScene(pathname);
            
            setIsLoading(false);
            
        }).catch((error) => {
            console.error("erro inicializacao:", error);
            setIsLoading(false);
        });
        
    }, [])

    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;
        engineRef.current.loadScene(pathname);
    }, [pathname])

    return (
        <>
            <div 
                className={`fixed inset-0 z-50 flex items-center justify-center bg-[#111] transition-opacity duration-500 ${
                    isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
            </div>
            
            <canvas ref={canvasRef} className="fixed inset-0 z-0 object-cover"></canvas>
        </>
    )
}