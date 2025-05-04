import { cn } from "@/lib/utils";
import { Spinner, SpinnerType } from "./Spinner";

interface LoaderProps {
  type?: SpinnerType;
  light?: boolean;
}

export const Loader = ({ type = "brand", light = false }: LoaderProps) => {
  return (
    <div
      className={cn(
        "w-full h-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-[100000]",
        { "bg-[#fafafa]": light }
      )}
    >
      <div className="">
        <Spinner classNames="h-[40px]" type={type} />
      </div>
    </div>
  );
};
