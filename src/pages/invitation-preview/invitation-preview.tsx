import { useParams } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import InvitationPreviewForeground from "~/layers/foreground/InvitationPreviewForeground";

function InvitationPreview() {
  const { uuid } = useParams();
  return (
    <>
      <InvitationPreviewForeground uuid={uuid} />
      <MonotonicBackground color="#000" />
    </>
  );
}

export default InvitationPreview;
