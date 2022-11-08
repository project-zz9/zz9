import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export function useBlocker(
  blocker?: () => boolean,
  when: boolean = true
): void {
  const history = useHistory();
  useEffect(() => {
    const unblock = history.block((_, action) => {
      if (!when || action === "PUSH" || action === "REPLACE") return true;
      return (!blocker || blocker()) as any;
    });
    return () => {
      unblock();
    };
  }, [blocker, history, when]);
}
