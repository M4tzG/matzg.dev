import Link from "next/link";

// import { MyStuffButton } from "../Icons/MyStuffButton";

export default function NavigationButton({
    to,
    Icon,
    className
 }) {

    return (
        <Link href={to} className={`block ${className} pointer-events-none`}>
            <Icon />
        </Link>
    )

}
