import { Footer, Loader, PublicContentCard } from "@/components";
import { DesktopNavbar } from "@/components/navbar";
import { useRedux } from "@/hooks";
import { fetchAllContents } from "@/redux";
import { useEffect } from "react";

export const Works = () => {
  const { dispatch, useStateSelector } = useRedux();

  const { contents, fetchingAllContents, allContentsFetched } =
    useStateSelector((state) => state.Content);

  useEffect(() => {
    if (!contents && !fetchingAllContents) {
      dispatch(fetchAllContents());
    }
  }, []);

  return (
    <div className="min-h-dvh bg-[#fafafa] flex flex-col">
      <DesktopNavbar />

      <div className="flex-1 py-20 w-[90%] max-w-7xl mx-auto">
        <h1 className="font-great-vibe text-5xl md:text-6xl text-blue-400">
          My Works
        </h1>

        {fetchingAllContents ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[500px] mt-10 gap-6">
            {contents?.map((content) => (
              <PublicContentCard {...content} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
