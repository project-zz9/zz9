import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function InvitationPreview() {
  return (
    <>
      <DemoForeground title="InvitationPreview" color="red" />
      <MonotonicBackground />
    </>
  );
}

export default InvitationPreview;
