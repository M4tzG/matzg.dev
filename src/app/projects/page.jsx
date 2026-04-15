import NavigationButton from "../components/NavigationButton";
import { BackButtonIcon } from "../components/Icons/BackButtonIcon";

export default function Projects() {
  return (
      <section className="absolute top-0 left-0 z-10 p-10 md:p-20 xl:p-10">
          <NavigationButton 
            to="/" 
            Icon={BackButtonIcon}
            className="w-2/4 md:w-9/10" 
          />
          
      </section>
  );
}