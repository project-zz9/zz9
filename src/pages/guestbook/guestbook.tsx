import { Fragment } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Guestbook() {
  return (
    <Fragment>
      <DemoForeground title="Guestbook" color="red" />
      <MonotonicBackground />
    </Fragment>
  );
}

export default Guestbook;
