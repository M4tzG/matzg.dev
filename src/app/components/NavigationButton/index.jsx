'use client'

import Link from "next/link";

export default function NavigationButton({
    to,
    Icon,
    className,
    openInNewTab = false,
    onClick
 }) {

    const target = openInNewTab ? "_blank" : "_self";
    const rel = openInNewTab ? "noopener noreferrer" : undefined;

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);        
        }
    };

    return (
        <Link href={to} target={target} rel={rel} className={`block ${className} pointer-events-none`} onClick={handleClick}>
            <Icon />
        </Link>
    )

}
