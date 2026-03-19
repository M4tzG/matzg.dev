'use client'

import { LogoMobileIcon } from "../Icons/LogoMobileIcon"

export default function MobileLogo(props) {

    return (

        <LogoMobileIcon 
            className={`w-5/8 h-auto ${props.className || ''}`}
        />
    )
}