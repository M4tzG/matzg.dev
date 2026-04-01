"use client"

import { useCanvasEngine } from '@/hooks/useCanvasEngine';
import SpinnerLoading from '../SpinnerLoading';
import GyroButton from '../GyroButton';


export default function CanvasContainer () {

    const { canvasRef, isLoading, isCanvasVisible, handleActivateGyro } = useCanvasEngine();
        
    return (
        <>
            <SpinnerLoading isLoading={isLoading} />

            <canvas ref={canvasRef} className={`absolute inset-0 z-0 w-full h-full block transition-opacity duration-500 ${
                    isCanvasVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}></canvas>

            <GyroButton onAtivarGyro={handleActivateGyro} />
        </>
    )
}