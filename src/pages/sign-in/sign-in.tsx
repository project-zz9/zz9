import DemoBackground from "~/layers/background/DemoBackground";
import DemoForeground from "~/layers/foreground/DemoForeground";

function SignIn() {
  return (
    <>
      <DemoForeground title="SignIn" color="red" />
      <DemoBackground />
    </>
  );
}

export default SignIn;
