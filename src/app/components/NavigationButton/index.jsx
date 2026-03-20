import { useRouter } from "next/navigation";

export default function NavigationButton({
    to,
    icon: icon,
    label,
    className
 }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(to);
    }

    return (
        <button>
            
        </button>
    )

}
