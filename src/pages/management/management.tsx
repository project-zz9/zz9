import { useAtom } from "jotai";
import { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import ManagementForeground from "~/layers/foreground/ManagementForeground";
import { roleAtom } from "~/stores/role";
import { HOME_PATH } from "..";

function Management() {
  const [role] = useAtom(roleAtom);
  const history = useHistory();
  useEffect(() => {
    if (!role) {
      history.replace(HOME_PATH);
    }
  }, [history, role]);
  return (
    <Fragment>
      {role && <ManagementForeground role={role} />}
      <MonotonicBackground />
    </Fragment>
  );
}

export default Management;
