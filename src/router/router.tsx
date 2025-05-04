import { Route, Routes } from "react-router-dom";
import {
  Login,
  Logout,
  NotFound,
  Dashboard,
  Home,
  AboutMe,
  Works,
  Contact,
} from "@/pages";
import Layout from "@/layout";
import { PrivateRoutes } from "./private.routes.tsx";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutMe />} />
      <Route path="/works" element={<Works />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="admin">
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoutes>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoutes>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
