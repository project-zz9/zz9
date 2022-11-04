import MonotonicBackground from "~/layers/background/MonotonicBackground";
import SignInPageForeground from "~/layers/foreground/SignInPageForeground";

function SignIn() {
  return (
    <>
      <SignInPageForeground />
      <MonotonicBackground />
    </>
  );
}

export default SignIn;
