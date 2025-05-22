import { DesktopNavbar } from "@/components/navbar";
import me from "@/assets/images/me.jpg";
import aboutInfo from "@/data/about.json";
import { Footer } from "@/components";

export const AboutMe = () => {
  return (
    <div className="min-h-dvh bg-[#fafafa]">
      <DesktopNavbar />

      {/* About me */}
      <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 w-[90%] max-w-7xl mx-auto py-20">
        <div className="flex flex-col gap-8 row-start-2 lg:row-start-1">
          <h1 className="font-great-vibe text-5xl md:text-6xl text-blue-400">
            About Me
          </h1>
          {aboutInfo.map((content) => (
            <p className="font-jost leading-loose text-gray-500">{content}</p>
          ))}
        </div>

        {/* Image */}
        <div className="">
          <div>
            <img src={me} alt="Kaani Image" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
