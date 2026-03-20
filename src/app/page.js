"use client"

import SceneButton from "./components/SceneButton";
import Logo from "./components/Logo";
import MobileLogo from "./components/MobileLogo";
import { useState, useEffect } from 'react';

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-between items-center py-10 z-10 xl:top-auto xl:bottom-0 xl:h-1/3 xl:flex-row xl:py-0">
      

      <div className="flex w-full justify-center xl:w-1/4 xl:justify-start xl:ml-40">
        {isMobile ? <MobileLogo /> : <Logo />}
      </div>


      <div className="flex w-full justify-center pb-20 xl:w-1/2 xl:justify-end">
        {isMobile ? <SceneButton to="/projects" image="/assets/homeAssets/myStuff.svg" className="md:pr-4" textColor="Black"/> : <SceneButton to="/projects" image="/assets/homeAssets/myStuff.svg" className="md:pr-4" textColor="White"/>}
        
      </div>
      
    </div>
  );
}