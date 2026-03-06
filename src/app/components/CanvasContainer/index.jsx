"use client"

import Engine from "@/lib/Engine";
import { useEffect, useRef } from "react";



export default function CanvasContainer () {
    const canvasRef = useRef(null);
    useEffect ( () => {
        if (!canvasRef.current ) return;
        const engine = new Engine(canvasRef.current, false, true);
        engine.init();
        // new Engine(canvasRef, isMobile, webGL)
        // init(canvasRef.current);
    })
    return (
        <canvas ref={canvasRef} className="fixed inset-0 z-1"></canvas>
    )
}
