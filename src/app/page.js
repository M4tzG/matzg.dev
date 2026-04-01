'use client'

import { useRouter } from 'next/navigation';
import NavigationButton from "./components/NavigationButton";
import Logo from "./components/Logo";

import { MyStuffButton } from "./components/Icons/MyStuffButton";


export default function Home() {
  const router = useRouter();

  const handleMyStuffClick = (e) => {
    e.preventDefault(); 

    window.dispatchEvent(new CustomEvent('start-canvas-transition', {
      detail: {
        onComplete: () => {
          router.push('/projects');
        }
      }
    }));
  };
  
  return (
    <section className="fixed inset-0 z-10 pointer-events-none">
      
      <div className="h-full max-w-[2000px] mx-auto mx-auto flex flex-col justify-between pointer-events-auto md:items-center lg:flex-row lg:items-end"> 
          <div className="flex w-full justify-center pt-8 md:pt-20 lg:pt-0 lg:pl-10 lg:pb-10 2xl:pl-20 2xl:pb-15 md:w-1/2 xl:w-1/4 lg:justify-start">
            <Logo />
          </div>

          <div className="flex justify-center w-full lg:w-4/10 lg:justify-end">
            <NavigationButton 
              to="/projects" 
              Icon={MyStuffButton}
              className="w-full text-black lg:text-white"
              openInNewTab={false}
              onClick={handleMyStuffClick}
            />
          </div>
      </div>

    </section>
  );
}