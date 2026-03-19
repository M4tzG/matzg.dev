'use client'

import { useRouter } from "next/navigation"
import { MyStuffButtonIcon } from "../Icons/MyStuffButtonIcon"

export default function SceneButton(props) {
    const router = useRouter()

    const handleClick = () => {
        router.push(props.to)
    }

    return (
        <button 
            className="inline-block border-none bg-transparent p-0 "
            style={{ pointerEvents: 'none' }}
        >
            <MyStuffButtonIcon 
                textColor={`${props.textColor}`}
                onClick={handleClick}
                className={`w-full h-auto ${props.className || ''}`}
            />
        </button>
    )
}