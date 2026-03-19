import SceneButton from "./components/SceneButton";
import Logo from "./components/Logo";


export default function Home() {
  return (

    <div className="fixed bottom-0 w-full h-3/10 justify-between items-center z-10 flex">
      <div className="flex w-1/4 justify-start ml-40">
        <Logo />
      </div>

      <div className="flex w-1/2 justify-end">
        <SceneButton to="/projects" image="/assets/homeAssets/myStuff.svg" className="pr-4"/>
      </div>
    </div>
  );
}