import { getProfileDetails } from "@/api";
import { Admin, ApiResponse } from "@/interfaces";
import { useEffect, useState } from "react";

interface GetProfileRes extends Omit<ApiResponse, "message"> {
  user: Admin;
}

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response =
          (await getProfileDetails()) as unknown as GetProfileRes;
        console.log(response);
        if (response.success) {
          setIsAuthorized(true);
          sessionStorage.setItem("authUser", JSON.stringify(response.user));
        }
      } catch (error) {
        setIsAuthorized(false);
        sessionStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthorized, loading };
};
