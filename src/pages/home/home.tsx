import MonotonicBackground from "~/layers/background/MonotonicBackground";
import MainPageForeground from "~/layers/foreground/MainPageForeground";

function Home() {
  return (
    <>
      <MainPageForeground />
      <MonotonicBackground color="#000" />
    </>
  );
}

export default Home;
