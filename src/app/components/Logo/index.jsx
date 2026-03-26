"use client"; // Necessário no Next.js para usar hooks e GSAP

import { useRef } from 'react';

import { LogoMobile } from '../Icons/LogoMobile';
import { LogoIcon } from '../Icons/LogoIcon';

import gsap from 'gsap';


export default function Logo() {

  const displacementRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(displacementRef.current, {
      attr: { scale: 0 },
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(displacementRef.current, {
      attr: { scale: 12 },
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };
  

  return (
    <>
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="distorcao">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="1" result="noise" />
            <feDisplacementMap 
              ref={displacementRef}
              in="SourceGraphic" 
              in2="noise" 
              scale="12" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>


      <div className="block w-3/4 md:w-full lg:hidden">
        <LogoMobile />
      </div>


      <div 
        className={`hidden text-white lg:flex items-center gap-4 [filter:url(#distorcao)]`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      > 
          <div className="w-30 flex-shrink-0">
            <LogoIcon />
          </div>

          <div className="flex flex-col w-3/5 justify-center ml-5">
            <div className="text-medium font-bold leading-tight">LKD_GG</div>
            <a href="https://github.com/M4tzG" target="_blank" rel="noopener noreferrer" className="text-tiny opacity-80 leading-tight">@matzg</a>
          </div>

      </div>
    </>
  );
}