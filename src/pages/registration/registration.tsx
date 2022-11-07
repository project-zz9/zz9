import { Fragment, useState } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import RegistrationForeground from "~/layers/foreground/RegistrationForeground";

function Registration() {
  const [color, setColor] = useState<ColorCode | undefined>();
  return (
    <Fragment>
      <RegistrationForeground changeColorHandler={setColor} />
      <MonotonicBackground color={color} />
    </Fragment>
  );
}

export default Registration;
