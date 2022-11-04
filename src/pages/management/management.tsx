import MonotonicBackground from "~/layers/background/MonotonicBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Management() {
  return (
    <>
      <DemoForeground title="Management" color="yellow" />
      <MonotonicBackground />
    </>
  );
}

export default Management;
