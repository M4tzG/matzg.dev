"use client";

import { useState } from "react";
import NavigationButton from "@ui/NavigationButton";
import Carousel from "../Carousel";
import { BackButtonIcon } from "@ui/Icons/BackButtonIcon";

export default function ProjectsUI({ projects: projects }) {
  const [activeProject, setActiveProject] = useState(0);

  if (!projects || projects.length === 0) {
    return <div className="flex h-screen items-center justify-center text-white">Nenhum projeto encontrado.</div>;
  }

  const currentProject = projects[activeProject];

  return (
    <section className="flex flex-col md:flex-row w-full h-screen bg-gray-900 text-center overflow-hidden">
      
      {/* --- LADO ESQUERDO: CONTEÚDO --- */}
      <div className="relative flex flex-col md:flex-row w-full h-4/5 md:w-[75%] md:h-full bg-blue-900/20">
        
        {/* Header/Nav dentro do conteúdo */}
        <div className="flex items-center justify-between w-full p-6 md:w-1/5 md:flex-col md:items-start md:justify-start md:pr-0">
          <NavigationButton 
            to="/" 
            Icon={BackButtonIcon} 
            className="w-1/4 md:w-3/4" 
          />
          
          <button className="md:hidden bg-yellow-400 px-7 py-3 font-bold text-black shadow-[4px_4px_0px_white] transition-transform rotate-3 hover:scale-110">
            CONTACT ME
          </button>
        </div>

        {/* Display do Projeto */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:w-4/5 md:-mt-10 2xl:-mt-50">
          
          {/* Thumbnail */}
          <div className="relative flex justify-center w-full h-1/2 mb-4 overflow-hidden rounded-lg bg-gray-700 shadow-2xl md:w-4/5 md:h-2/5 md:items-start">
            {currentProject.thumb ? (
              <img src={currentProject.thumb} alt={currentProject.title} className="h-full w-full object-cover" />
            ) : (
              <span className="self-center text-white">Sem Imagem</span>
            )}
          </div>
          
          {/* Título */}
          <div className="flex items-center justify-center w-full p-2 mb-2 rounded-lg bg-gray-800/50 shadow-lg md:w-4/5 md:justify-start">
            <h2 className="text-xl font-bold tracking-wider text-white uppercase md:text-3xl">
              {currentProject.title}
            </h2>
          </div>

          {/* Descrição */}
          <div className="flex items-center justify-center w-full p-2 rounded-lg bg-gray-800/50 shadow-lg md:w-4/5 md:justify-start">
            <p className="max-w-2xl text-md text-gray-300 line-clamp-3 md:text-xl">
              {currentProject.resume}
            </p>
          </div>

          {/* Tags */}
          {currentProject.tags && (
            <div className="hidden md:flex gap-2 mt-4">
              {currentProject.tags.map(tag => (
                <span key={tag} className="bg-red-500 px-2 py-1 text-sm font-bold text-white rotate-[-2deg]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- LADO DIREITO: ROLETA --- */}
      <div className="relative flex flex-col items-center justify-center w-full h-1/5 border-t border-gray-700 bg-green-900/20 md:w-[25%] md:h-full md:border-t-0">
        <div className="flex items-center justify-center w-full h-full bg-gray-700/50 shadow-lg md:h-4/5 md:w-4/5 md:rounded-lg overflow-hidden">
          
          <Carousel 
            projects={projects} 
            activeIndex={activeProject} 
            onChangeProject={(index) => setActiveProject(index)} 
          />

        </div>
        
        <button className="hidden md:block mt-5 bg-yellow-400 px-7 py-3 font-bold text-black shadow-[4px_4px_0px_white] transition-transform rotate-3 hover:scale-110">
          CONTACT ME
        </button>
      </div>

    </section>
  );
}