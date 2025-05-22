import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideNav from "./SideNav";

export const DesktopNavbar = () => {
  const location = useLocation();

  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const onOpen = () => {
    setIsSidenavOpen(true);
  };

  const onClose = () => {
    setIsSidenavOpen(false);
  };

  const toggler = useRef(null);

  return (
    <nav
      className={cn("h-20 block relative z-100 bg-transparent", {
        "bg-white": location.pathname !== "/",
      })}
    >
      <div className="w-[90%] mx-auto max-w-7xl h-full">
        <div className="w-full flex items-center justify-between h-full">
          <div
            aria-roledescription="Logo"
            className="font-great-vibe text-3xl font-bold text-blue-400"
          >
            Kaani
          </div>

          {/* Nav links */}
          <ul className="md:flex items-center gap-8 hidden">
            <li className="font-jost text-lg font-medium text-gray-400 hover:text-gray-500 transition-all duration-500">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="font-jost text-lg font-medium text-gray-400 hover:text-gray-500 transition-all duration-500">
              <Link to={"/about"}>About Me</Link>
            </li>
            <li className="font-jost text-lg font-medium text-gray-400 hover:text-gray-500 transition-all duration-500">
              <Link to={"/works"}>View my works</Link>
            </li>
            <li className="font-jost text-lg font-medium text-gray-400 hover:text-gray-500 transition-all duration-500">
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>

          {/* Side nav */}
          <SideNav onClose={onClose} isOpen={isSidenavOpen} />

          {/* Side nav toggler */}
          <div
            className={cn("toggle-nav", { cross: isSidenavOpen })}
            onClick={onOpen}
            ref={toggler}
          >
            <span
              className={cn("a h-[3px] bg-white", {
                "bg-blue-400": location.pathname !== "/",
              })}
            ></span>
            <span
              className={cn("b h-[3px] bg-white", {
                "bg-blue-400": location.pathname !== "/",
              })}
            ></span>
            <span
              className={cn("c h-[3px] bg-white", {
                "bg-blue-400": location.pathname !== "/",
              })}
            ></span>
          </div>
        </div>
      </div>
    </nav>
  );
};
