import { DesktopNavbar } from "@/components/navbar";
import { Link } from "react-router-dom";
import notFoundGif from "@/assets/images/404_page_2.gif";

export const NotFound = () => {
  return (
    <div className="min-h-dvh bg-[#fafafa] flex flex-col">
      <DesktopNavbar />
      <div className="flex-1 w-[90%] max-w-7xl mx-auto flex flex-col">
        <div className="w-full h-full flex flex-col justify-center items-center flex-1">
          <div className="max-w-[400px] max-h-[400px] w-fill">
            <img src={notFoundGif} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl md:text-3xl font-jost font-semibold max-w-xl text-center">
            The page you request for could not be found
          </h1>
          <Link
            to={"/"}
            className="mb-40 mt-6 bg-blue-400 px-8 py-3 text-white font-jost rounded-lg transtion-colors duration-500 hover:bg-blue-500"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
