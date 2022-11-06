import { Fragment } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Management() {
  return (
    <Fragment>
      <DemoForeground title="Management" color="yellow" />
      <MonotonicBackground />
    </Fragment>
  );
}

export default Management;
