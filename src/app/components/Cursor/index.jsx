'use client'

import { useEffect, useRef } from "react";
import "./index.css";

export default function Cursor() {

    const cursor = useRef(null)
    const sight = useRef(null)
    const cursorXmark = useRef(null)

    const cursorXmarkSize = useRef(0)
    const sightSquareSize = useRef(0)
    const cursorSquareSize = useRef(0)

    const cursorEasingFactor = useRef(0.49)
    const sightEasingFactor = useRef(0.69)

    const mouseX = useRef(0)
    const mouseY = useRef(0)

    useEffect(() => {

        cursorXmarkSize.current = cursorXmark.current.offsetWidth / 2
        sightSquareSize.current = sight.current.offsetWidth / 2
        cursorSquareSize.current = cursor.current.offsetWidth / 2

        const handleMouseMove = (e) => {
            mouseX.current = e.pageX
            mouseY.current = e.pageY
        }

        const handleClick = (e) => {

            cursor.current.classList.add('cursor-clicked')
            sight.current.classList.add('sight-clicked')

            cursorXmark.current.style.left =
                e.pageX - cursorXmarkSize.current + 'px'

            cursorXmark.current.style.top =
                e.pageY - cursorXmarkSize.current + 'px'

            cursorXmark.current.style.rotate =
                `${Math.random() * 360}deg`

            cursorXmark.current.classList.add('cursor-x-mark-visible')

            setTimeout(() => {
                cursor.current.classList.remove('cursor-clicked')
                sight.current.classList.remove('sight-clicked')
            }, 200)

            setTimeout(() => {
                cursorXmark.current.classList.remove('cursor-x-mark-visible')
            }, 400)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('click', handleClick)

        const update = () => {

            const cursorDX =
                mouseX.current -
                cursor.current.offsetLeft -
                cursorSquareSize.current

            const cursorDY =
                mouseY.current -
                cursor.current.offsetTop -
                cursorSquareSize.current

            cursor.current.style.left =
                cursor.current.offsetLeft +
                cursorDX * cursorEasingFactor.current +
                'px'

            cursor.current.style.top =
                cursor.current.offsetTop +
                cursorDY * cursorEasingFactor.current +
                'px'


            const sightDX =
                mouseX.current -
                sight.current.offsetLeft -
                sightSquareSize.current

            const sightDY =
                mouseY.current -
                sight.current.offsetTop -
                sightSquareSize.current

            sight.current.style.left =
                sight.current.offsetLeft +
                sightDX * sightEasingFactor.current +
                'px'

            sight.current.style.top =
                sight.current.offsetTop +
                sightDY * sightEasingFactor.current +
                'px'

            requestAnimationFrame(update)
        }

        update()

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('click', handleClick)
        }

    }, [])

    return (
        <>
            <div ref={cursor} className="cursor"></div>
            <div ref={sight} className="cursor-center"></div>
            <div ref={cursorXmark} className="cursor-x-mark"></div>
        </>
    )
}