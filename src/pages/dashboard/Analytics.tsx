import { MainContent, Button, Loader, AnalyticsWidget } from "@/components";
import { analytics } from "@/constant";
import { useRedux } from "@/hooks/useRedux";
import { getAnalyticsThunk } from "@/redux";
import { useEffect } from "react";

const Analytics = () => {
  const { dispatch, useStateSelector } = useRedux();

  const {
    analytics,
    isFetchingAnalytics,
    analyticsFetchError,
    isAnalyticsFetched,
    fetchMessage,
  } = useStateSelector((state) => state.Analytics);

  useEffect(() => {
    if (analytics.length !== 0) return;
    dispatch(getAnalyticsThunk(null));
  }, [dispatch]);

  const retryGetAnalytics = () => dispatch(getAnalyticsThunk(null));

  return (
    <MainContent>
      <h1 className="text-white text-3xl neue-regular font-bold">Dashboard</h1>

      {isFetchingAnalytics ? (
        <div
          className="
        flex-1 transparent-white p-4 w-full"
        >
          <Loader type="brand" />
        </div>
      ) : !isAnalyticsFetched && analyticsFetchError ? (
        <div
          className="
            flex-1 transparent-white p-4 w-full flex justify-center items-center flex-col gap-3"
        >
          <p className="text-gray-300 neue-regular text-center text-sm">
            An unknown error occured. Please try again
          </p>
          <Button className="max-w-56" onClick={retryGetAnalytics}>
            <p className="text-white neue-regular text-xl">Retry</p>
          </Button>
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-1  ${
              analytics.length === 2 ? "custom-grid-md-2" : "custom-grid-md-3"
            } gap-6 md:gap-5 mt-4`}
          >
            {analytics.map((staffAnalytics) => (
              <AnalyticsWidget {...staffAnalytics} />
            ))}
          </div>
          <div
            className="
        drop-shadow-sm flex-1 bg-[var(--transparent-white)] p-4 w-full rounded-sm"
          >
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-white text-2xl">Coming Soon</p>
            </div>
          </div>
        </>
      )}
    </MainContent>
  );
};

export default Analytics;
