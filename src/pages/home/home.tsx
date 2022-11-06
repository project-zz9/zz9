import { Fragment } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import MainPageForeground from "~/layers/foreground/MainPageForeground";

function Home() {
  return (
    <Fragment>
      <MainPageForeground />
      <MonotonicBackground color="#000" />
    </Fragment>
  );
}

export default Home;
