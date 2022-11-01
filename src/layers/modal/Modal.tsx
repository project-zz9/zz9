import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import CustomModal from "~/components/organizations/CustomModal";
import { modalAtom, ModalParameter, visibleAtom } from "~/stores/modal";

function Modal() {
  const [modalData] = useAtom(modalAtom);
  const [visible, setVisible] = useAtom(visibleAtom);
  const [historyStack, setHistoryStack] = useState<ModalParameter[]>([]);
  useEffect(() => {
    modalData && setHistoryStack((stack) => [...stack, modalData]);
  }, [modalData]);

  const { type, content, Element, onSubmit, onCancel } =
    historyStack.at(-1) || {};

  const { onCancelHandler, onSubmitHandler } = useMemo(
    () => ({
      onCancelHandler() {
        onCancel?.handler &&
          typeof onCancel.handler === "function" &&
          onCancel.handler();
        historyStack.length > 1
          ? setHistoryStack((stack) => stack.slice(0, -1))
          : setVisible(false);
      },
      onSubmitHandler() {
        onSubmit?.handler &&
          typeof onSubmit.handler === "function" &&
          onSubmit.handler();
        historyStack.length > 1
          ? setHistoryStack((stack) => stack.slice(0, -1))
          : setVisible(false);
      },
    }),
    [historyStack, onCancel, onSubmit, setVisible]
  );

  return (
    <CustomModal
      visible={visible}
      type={type}
      hash={JSON.stringify(historyStack.at(-1) || {})}
      Element={Element}
      content={content}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onSubmitHandler={onSubmitHandler}
      onCancelHandler={onCancelHandler}
    />
  );
}

export default Modal;
