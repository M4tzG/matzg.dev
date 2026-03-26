'use client';
import { useState, useEffect } from 'react';

export default function GyroButton({ onActivateGyro }) {
    const [needsPermission, setNeedsPermission] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            setNeedsPermission(true);
        } 
    }, [onActivateGyro]);

    const requestAccess = async () => {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') {
                setNeedsPermission(false);
                if (onActivateGyro) onActivateGyro();
            } else {
                setPermissionDenied(true);
            }
        } catch (error) {
            console.error("Error requesting gyroscope permission:", error);
        }
    };

    if (!needsPermission) return null;

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-2 rounded-lg bg-black/80 p-3 text-white shadow-lg pointer-events-auto">
            {permissionDenied ? (
                <span className="text-xs text-red-400">Parallax Blocked</span>
            ) : (
                <>
                    <span className="text-sm">Parallax?</span>
                    <button 
                        onClick={requestAccess}
                        className="rounded bg-green-500 px-3 py-1.5 font-bold text-white hover:bg-green-600"
                    >
                        Allow
                    </button>
                </>
            )}
        </div>
    );
}