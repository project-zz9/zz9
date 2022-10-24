import DemoBackground from "~/layers/background/DemoBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Guestbook() {
  return (
    <>
      <DemoForeground title="Guestbook" color="red" />
      <DemoBackground />
    </>
  );
}

export default Guestbook;
