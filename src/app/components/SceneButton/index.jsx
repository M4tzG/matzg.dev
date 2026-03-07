'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SceneButton (props){
    // to, scene, image

    const router = useRouter()
    const handleClick = async () =>{

        // await gsap.to('.minha-tela-de-transicao', { duration: 1, x: 100, ... }) 

        router.push(props.to)

    }
    return (
        <button onClick={handleClick} className="w-full h-full flex items-center justify-center border-none bg-transparent p-0"> 
            <Image 
                src={props.image} 
                width={200} 
                height={200} 
                alt="frame"
                priority={true}
                unoptimized={true}
                style={{width: 'auto', height: 'auto'}}
            />  
        </button>
    )
}