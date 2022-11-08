import { HashRouter as Router } from "react-router-dom";
import Modal from "~/layers/modal";
import Application from "./Application";

function Root() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Application />
      </Router>
      <Modal />
    </>
  );
}

export default Root;
