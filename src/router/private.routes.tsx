import { Loader } from "@/components";
import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const PrivateRoutes = (props: any) => {
  const { isAuthorized, loading } = useAuth();

  if (!isAuthorized && !loading) {
    return <Navigate to={{ pathname: "/admin/login" }} />;
  }

  if (!sessionStorage.getItem("accessToken")) {
    return <Navigate to={{ pathname: "/admin/login" }} />;
  }

  if (loading) return <Loader />;

  return <>{props.children}</>;
};
