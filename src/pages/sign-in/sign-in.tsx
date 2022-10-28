import DemoBackground from "~/layers/background/DemoBackground";
import SignInPageForeground from "~/layers/foreground/SignInPageForeground";

function SignIn() {
  return (
    <>
      <SignInPageForeground />
      <DemoBackground />
    </>
  );
}

export default SignIn;
