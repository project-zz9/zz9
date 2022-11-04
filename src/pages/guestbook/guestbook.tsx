import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Guestbook() {
  return (
    <>
      <DemoForeground title="Guestbook" color="red" />
      <MonotonicBackground />
    </>
  );
}

export default Guestbook;
