import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import type { History, Blocker, Transition } from "history";
import { useContext, useEffect } from "react";

export function useBlocker(blocker: Blocker, when = true): void {
  const navigator = useContext(NavigationContext).navigator as History;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
