"use client"; // Necessário no Next.js para usar hooks e GSAP

import { useRef } from 'react';
import { Lacquer } from 'next/font/google';
import gsap from 'gsap';

const lacquer = Lacquer({
  subsets: ['latin'],
  weight: '400',
});

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
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="distorcao">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="1" result="noise" />
            {/* Adicionamos a ref aqui! Começa com scale="12" */}
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



      <div 
        className={`flex w-full items-center gap-2 ${lacquer.className} cursor-pointer [filter:url(#distorcao)]`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      > 
        <div className="w-30 flex-shrink-0">
          <img src="/assets/homeAssets/logoSDistort.svg" alt="Logo" className="w-full h-auto" />
        </div>

        <div className="w-3/5 flex flex-col justify-center ml-5">
          <div className="text-medium font-bold leading-tight">LKD_GG</div>
          <a className="text-tiny opacity-80 leading-tight">@matzg</a>
        </div>
      </div>
    </>
  );
}