import { useAtom } from "jotai";
import { Fragment } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import ManagementForeground from "~/layers/foreground/ManagementForeground";
import { roleAtom } from "~/stores/role";

function Management() {
  const [role] = useAtom(roleAtom);
  return (
    <Fragment>
      <ManagementForeground role={role} />
      <MonotonicBackground />
    </Fragment>
  );
}

export default Management;
