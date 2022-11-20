import { Fragment } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import ManagementForeground from "~/layers/foreground/ManagementForeground";

function Management() {
  return (
    <Fragment>
      <ManagementForeground />
      <MonotonicBackground />
    </Fragment>
  );
}

export default Management;
