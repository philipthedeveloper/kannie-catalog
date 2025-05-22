import { logoutUser } from "../redux";
import { useEffect } from "react";
import { Spinner, Button } from "@/components";
import { useProfile, useRedux } from "@/hooks";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { dispatch, useStateSelector } = useRedux();
  const { userProfile } = useProfile();

  const { isLoggedOut, isLoggingOut, logoutError } = useStateSelector(
    (state) => state.Login
  );

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (!userProfile) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[90%] max-w-80">
          {isLoggingOut && (
            <div className="flex flex-col gap-3 w-full items-center mx-auto">
              <Spinner type="brand" />
              <p className="text-sm text-gray-300 neue-regular text-center">
                Don't close this window. You are being logged out...
              </p>
            </div>
          )}
          {!isLoggingOut && isLoggedOut && (
            <>
              <h1 className="text-center text-white text-3xl font-bold neue-regular">
                You are logged out
              </h1>
              <p className="text-center text-sm text-gray-400 neue-regular mt-3">
                Thank you for using Kaani Portal
              </p>
              <div className="w-[90%] max-w-[500px] md:max-w-[350px] mx-auto mt-6 relative">
                <a
                  className="text-center text-sm py-3 px-4 bg-[var(--base-color)] text-white w-full rounded-md font-medium hover:opacity-80 flex items-center justify-center"
                  href={"/admin/login"}
                >
                  Sign In
                </a>
              </div>
            </>
          )}
          {!isLoggingOut && logoutError && (
            <>
              <h1 className="text-center text-white text-3xl font-bold neue-regular">
                Unable to log out
              </h1>
              <p className="text-center text-sm text-gray-400 neue-regular mt-3">
                An unknown error occurred. Please try again
              </p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
