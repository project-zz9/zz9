import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export function useBlocker(
  blocker?: () => boolean,
  when: boolean = true
): void {
  const history = useHistory();
  useEffect(() => {
    const unblock = history.block(() => {
      if (!when) return true;
      return !blocker || blocker();
    });
    return () => {
      unblock();
    };
  }, [blocker, history, when]);
}
