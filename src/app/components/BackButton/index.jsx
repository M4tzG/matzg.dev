'use client'

import { useRouter } from "next/navigation"
import { BackButtonIcon } from "../Icons/BackButtonIcon"

export default function BackButton(props) {
    const router = useRouter()

    const handleClick = () => {
        router.push(props.to)
    }

    return (
        <button 
            className="inline-block border-none bg-transparent p-0 "
            style={{ pointerEvents: 'none' }}
        >
            <BackButtonIcon 
                onClick={handleClick}
                className={`w-full h-auto ${props.className || ''}`}
            />
        </button>
    )
}