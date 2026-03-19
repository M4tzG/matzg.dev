import BackButton from "../components/BackButton"

export default function Projects() {
  return (
      <div className="absolute top-0 left-0 z-10 p-4 xl:p-10">
          <BackButton 
            to="/" 
            image="/assets/projectsAssets/backButton.svg" 
            className="w-50 h-50 p-5 xl:w-100 xl:h-100  md:p-1" 
          />
      </div>
  );
}