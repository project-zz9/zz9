import { useParams } from "react-router-dom";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function InvitationPreview() {
  const { uuid } = useParams();
  return (
    <>
      <DemoForeground title="InvitationPreview" color="red" />
      <MonotonicBackground />
    </>
  );
}

export default InvitationPreview;
