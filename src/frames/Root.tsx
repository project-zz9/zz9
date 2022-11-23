import { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Modal from "~/layers/modal";
import Application from "./Application";

function Root() {
  useEffect(() => {
    resizeEventHandler();
    window.addEventListener("resize", resizeEventHandler);
    return () => {
      window.removeEventListener("resize", resizeEventHandler);
    };
  }, []);
  return (
    <>
      <Router>
        <Application />
      </Router>
      <Modal />
    </>
  );
}

export default Root;

function resizeEventHandler() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
