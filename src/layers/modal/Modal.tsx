import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import CustomModal from "~/components/organizations/CustomModal";
import { modalAtom, ModalParameter, visibleAtom } from "~/stores/modal";

function Modal() {
  const [modalData] = useAtom(modalAtom);
  const [visible, setVisible] = useAtom(visibleAtom);
  const [currentModal, setCurrentModal] = useState<ModalParameter | null>(null);
  const [history, setHistory] = useState<ModalParameter[]>([]);

  useEffect(() => {
    modalData && setHistory((history) => [...history, modalData]);
  }, [modalData]);

  useEffect(() => {
    history.length > 0 && setCurrentModal(history.at(-1) || null);
  }, [history]);

  const { type, content, Element, onSubmit, onCancel } = currentModal || {};

  const { onCancelHandler, onSubmitHandler } = useMemo(
    () => ({
      onCancelHandler() {
        onCancel?.handler &&
          typeof onCancel.handler === "function" &&
          onCancel.handler();
        setHistory((history) => history.slice(0, -1));
        if (history.length === 1) setVisible(false);
      },
      onSubmitHandler() {
        onSubmit?.handler &&
          typeof onSubmit.handler === "function" &&
          onSubmit.handler();
        setHistory((history) => history.slice(0, -1));
        history.length === 1 && setVisible(false);
      },
    }),
    [history, onCancel, onSubmit, setVisible]
  );

  return (
    <CustomModal
      visible={visible}
      type={type}
      hash={JSON.stringify(currentModal || {})}
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
