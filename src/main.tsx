import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setAuthorization } from "./api/apiCore.ts";

setAuthorization(sessionStorage.getItem("accessToken"));

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer autoClose={2000} limit={1} theme="dark" />
      <App />
    </BrowserRouter>
  </Provider>
);
