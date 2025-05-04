import { Footer, Hero, Introduction, Works } from "@/components";
import { DesktopNavbar } from "@/components/navbar";
import me from "@/assets/images/me.jpg";
import aboutInfo from "@/data/about.json";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-dvh bg-[#fafafa]">
      <DesktopNavbar />
      <Hero />
      <Introduction />
      <div>
        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 w-[90%] max-w-7xl mx-auto py-20 pb-10">
          <div className="flex flex-col gap-8 row-start-2 lg:row-start-1">
            <h2 className="font-great-vibe text-3xl md:text-4xl text-blue-400 font-medium">
              About Me
            </h2>
            {aboutInfo && (
              <>
                <p className="font-jost leading-loose text-gray-500">
                  {aboutInfo[0]}
                </p>
                <p className="font-jost leading-loose text-gray-500">
                  {aboutInfo[1]}
                </p>
              </>
            )}
          </div>

          {/* Image */}
          <div className="">
            <div>
              <img src={me} alt="Kannie Image" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link
            to={"/about"}
            className="text-center text-sm py-3 px-4 bg-blue-400 text-white rounded-md font-medium hover:brightness-75 duration-300 flex items-center justify-center cursor-pointer w-max"
          >
            View full biography
          </Link>
        </div>
      </div>
      <Works />
      <Footer />
    </div>
  );
};
