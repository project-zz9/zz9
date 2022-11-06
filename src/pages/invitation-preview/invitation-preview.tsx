import { Fragment } from "react";
import { useParams } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import InvitationPreviewForeground from "~/layers/foreground/InvitationPreviewForeground";

function InvitationPreview() {
  const { uuid } = useParams();
  return (
    <Fragment>
      <InvitationPreviewForeground uuid={uuid} />
      <MonotonicBackground color="#000" />
    </Fragment>
  );
}

export default InvitationPreview;
