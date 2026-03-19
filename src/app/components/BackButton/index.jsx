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
            className="inline-block border-none bg-transparent"
            style={{ pointerEvents: 'none' }}
        >
            <BackButtonIcon 
                onClick={handleClick}
                className={`${props.className || ''}`}
            />
        </button>
    )
}