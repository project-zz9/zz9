import DemoBackground from "~/layers/background/DemoBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function Home() {
  return (
    <>
      <DemoForeground title="Home" color="green" />
      <DemoBackground />
    </>
  );
}

export default Home;
