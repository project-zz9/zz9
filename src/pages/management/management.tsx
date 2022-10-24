import DemoBackground from "~/layers/background/DemoBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Management() {
  return (
    <>
      <DemoForeground title="Management" color="yellow" />
      <DemoBackground />
    </>
  );
}

export default Management;
