import { changeActiveTab } from "@/redux/layout/layoutSlice";
import { menuItems } from "@/constant";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRedux } from "@/hooks";
import { useNavigate } from "react-router-dom";

export const SideMenu = () => {
  const { dispatch } = useRedux();

  const navigate = useNavigate();

  return (
    <div className="w-full h-full order-7">
      <div className="bg-[var(--transparent-white)] w-full h-full">
        <nav className="w-full h-full">
          <ul className="flex items-center md:flex-col justify-center md:justify-start gap-3 sm:gap-6 px-3 sm:px-12 md:px-0 md:py-8 w-full h-full">
            {menuItems.map((item) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <li
                      key={item.title}
                      className="cursor-pointer px-4 py-3 rounded-md hover:bg-[var(--transparent-white)] duration-300"
                      onClick={() => dispatch(changeActiveTab(item.tabName))}
                    >
                      <span className="flex flex-col items-center text-gray-200 gap-2">
                        <i className={item.icon}></i>
                      </span>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="md:mt-auto">
                  <button
                    className="cursor-pointer px-4 py-3 rounded-md hover:bg-[var(--transparent-white)] duration-300"
                    onClick={() => {
                      navigate("/admin/logout");
                    }}
                  >
                    <span className="flex flex-col items-center text-gray-200 gap-2">
                      <i className="fi fi-sr-leave"></i>
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
        </nav>
      </div>
    </div>
  );
};
