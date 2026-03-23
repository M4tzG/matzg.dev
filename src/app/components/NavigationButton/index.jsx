import Link from "next/link";

// import { MyStuffButton } from "../Icons/MyStuffButton";

export default function NavigationButton({
    to,
    Icon,
    className,
    openInNewTab = false
 }) {

    const target = openInNewTab ? "_blank" : "_self";
    const rel = openInNewTab ? "noopener noreferrer" : undefined;

    return (
        <Link href={to} target={target} rel={rel} className={`block ${className} pointer-events-none`}>
            <Icon />
        </Link>
    )

}
