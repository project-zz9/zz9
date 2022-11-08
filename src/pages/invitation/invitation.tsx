import { Fragment } from "react";
import { useParams } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import InvitationForeground from "~/layers/foreground/InvitationForeground";

function Invitation() {
  const { uuid } = useParams<{ uuid: string }>();
  return (
    <Fragment>
      <InvitationForeground uuid={uuid} />
      <MonotonicBackground color="#000" />
    </Fragment>
  );
}

export default Invitation;
