"use client"

import Engine from "@/lib/Engine";

import { useEffect, useRef } from "react";
import { usePathname } from 'next/navigation'



export default function CanvasContainer () {
    const canvasRef = useRef(null);
    const pathname = usePathname();
    const engineRef = useRef(null);
    const isInitializedRef = useRef(false);


    useEffect ( () => {
        if (!canvasRef.current ) return;

        engineRef.current = new Engine(canvasRef.current, false, true);

        console.log(pathname)
        // Aguarda init() terminar ANTES de loadScene()
        engineRef.current.init().then(() => {
            isInitializedRef.current = true;
            engineRef.current.loadScene(pathname);
        }).catch((error) => {
            console.error("Erro ao inicializar engine:", error);
        });
        

    }, [])

    useEffect ( () => {
        if (!engineRef.current || !isInitializedRef.current) return;

        engineRef.current.loadScene(pathname);
    }, [pathname])

    return (
        <canvas ref={canvasRef} className="fixed inset-0 z-0"></canvas>
    )
}
