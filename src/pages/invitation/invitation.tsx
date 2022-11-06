import { Fragment } from "react";
import { useParams } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import InvitationForeground from "~/layers/foreground/InvitationForeground";

function Invitation() {
  const { uuid } = useParams();
  return (
    <Fragment>
      <InvitationForeground uuid={uuid} />
      <MonotonicBackground />
    </Fragment>
  );
}

export default Invitation;
