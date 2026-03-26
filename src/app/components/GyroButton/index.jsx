// components/GyroButton.jsx
'use client';
import { useState, useEffect } from 'react';

export default function GyroButton({ onAtivarGyro }) {
    const [precisaPermissao, setPrecisaPermissao] = useState(false);
    const [permissaoNegada, setPermissaoNegada] = useState(false);

    useEffect(() => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            setPrecisaPermissao(true);
        } 
    }, [onAtivarGyro]);

    const solicitarAcesso = async () => {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') {
                setPrecisaPermissao(false);
                if (onAtivarGyro) onAtivarGyro();
            } else {
                setPermissaoNegada(true);
            }
        } catch (error) {
            console.error("Erro ao pedir permissão do giroscópio:", error);
        }
    };

    if (!precisaPermissao) return null;

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-2 rounded-lg bg-black/80 p-3 text-white shadow-lg pointer-events-auto">
            {permissaoNegada ? (
                <span className="text-xs text-red-400">Parallax bloqueado</span>
            ) : (
                <>
                    <span className="text-sm">Ativar efeito 3D? 📱</span>
                    <button 
                        onClick={solicitarAcesso}
                        className="rounded bg-green-500 px-3 py-1.5 font-bold text-white hover:bg-green-600"
                    >
                        Permitir
                    </button>
                </>
            )}
        </div>
    );
}