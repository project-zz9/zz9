import { useAtom } from "jotai";
import { modalVisibilityAtom, remoteModalActionAtom } from "~/stores/modal";
import { useBlocker } from "./useBlocker";

export function useModalBlocker(blocker?: () => boolean): void {
  const [modalVisibility] = useAtom(modalVisibilityAtom);
  const [, remoteModalAction] = useAtom(remoteModalActionAtom);
  useBlocker(() => {
    if (modalVisibility) {
      remoteModalAction(`${Math.random()}`);
      return false;
    }
    return !blocker || blocker();
  });
}
