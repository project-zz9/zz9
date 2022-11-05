import { HashRouter as Router } from "react-router-dom";
import Modal from "~/layers/modal";
import Application from "./Application";

function Root() {
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
