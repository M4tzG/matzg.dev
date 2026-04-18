"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Carousel = ({ projects, activeIndex, onChangeProject }) => {
  const containerRef = useRef(null);
  const isAnimating = useRef(false);
  const maxVisible = 7;

  const countToShow = Math.min(projects.length % 2 === 0 ? projects.length - 1 : projects.length, maxVisible);
  const sideItems = Math.floor(countToShow / 2);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -sideItems; i <= sideItems; i++) {
      let index = (activeIndex + i) % projects.length;
      if (index < 0) index += projects.length;
      indices.push(index);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  // Scroll Handler
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating.current) return;

      if (e.deltaY > 0) {
        // Scroll Down
        onChangeProject((activeIndex + 1) % projects.length);
      } else {
        // Scroll Up
        onChangeProject((activeIndex - 1 + projects.length) % projects.length);
      }

      // Simple lock to prevent scroll spam
      isAnimating.current = true;
      setTimeout(() => {
        isAnimating.current = false;
      }, 500); 
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, projects.length, onChangeProject]);

  // GSAP Animation Logic
  useGSAP(() => {
    gsap.fromTo(
      ".carousel-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-6 w-full h-full select-none"
    >
      {visibleIndices.map((idx, position) => {
        const isActive = idx === activeIndex;
        
        return (
          <div
            key={`${projects[idx].id}-${position}`}
            onClick={() => onChangeProject(idx)}
            className={`carousel-item cursor-pointer transition-colors duration-300 ${
              isActive 
                ? 'text-white font-black text-2xl scale-110' 
                : 'text-gray-500 font-medium text-lg hover:text-gray-300'
            }`}
          >
            <h1>{projects[idx].title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;