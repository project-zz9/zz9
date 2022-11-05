import { useState } from "react";
import MonotonicBackground from "~/layers/background/MonotonicBackground";
import RegistrationForeground from "~/layers/foreground/RegistrationForeground/RegistrationForeground";

function Registration() {
  const [color, setColor] = useState<ColorCode | undefined>();
  return (
    <>
      <RegistrationForeground changeColorHandler={setColor} />
      <MonotonicBackground color={color} />
    </>
  );
}

export default Registration;
