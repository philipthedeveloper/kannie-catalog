import { useEffect } from "react";
import { checkInViewPort } from "./helpers";
import Router from "./router/router";

const cardHandler = () => {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((image) => {
    let inViewPort = checkInViewPort(image);
    inViewPort ? image.classList.add("opacityToggler") : void 0;
    // : image.classList.remove("opacityToggler");
  });
};

function App() {
  useEffect(() => {
    cardHandler();
    window.addEventListener("scroll", cardHandler);
    window.addEventListener("DOMContentLoaded", cardHandler);

    return () => {
      window.removeEventListener("scroll", cardHandler);
      window.removeEventListener("DOMContentLoaded", cardHandler);
    };
  }, []);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
