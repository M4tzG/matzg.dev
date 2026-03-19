import BackButton from "../components/BackButton"


export default function Home() {
  return (
      <div className="flex w-full justify-start z-10">
        <div className="flex w-1/6">
            <BackButton to="/" image="/assets/projectsAssets/backButton.svg" className="p-10"/>
        </div>
        
      </div>
  );
}