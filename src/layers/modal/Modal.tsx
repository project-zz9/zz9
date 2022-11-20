import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import CustomModal from "~/components/organizations/CustomModal";
import {
  modalAtom,
  ModalParameter,
  modalVisibilityAtom,
  remoteModalActionAtom,
} from "~/stores/modal";

function Modal() {
  const [modalData] = useAtom(modalAtom);
  const [visibility, setVisibility] = useAtom(modalVisibilityAtom);
  const [remote] = useAtom(remoteModalActionAtom);
  const [currentModal, setCurrentModal] = useState<ModalParameter | null>(null);
  const [history, setHistory] = useState<ModalParameter[]>([]);
  useEffect(() => {
    modalData && setHistory((history) => [...history, modalData]);
  }, [modalData]);

  useEffect(() => {
    history.length > 0 && setCurrentModal(history[history.length - 1] || null);
  }, [history]);

  const closeModal = useCallback(() => {
    setHistory((history) => history.slice(0, -1));
    history.length === 1 && setVisibility(false);
  }, [history, setVisibility]);

  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote]);

  const { type, content, Element, onSubmit, onCancel } = currentModal || {};

  const { onCancelHandler, onSubmitHandler } = useMemo(
    () => ({
      onCancelHandler() {
        onCancel?.handler &&
          typeof onCancel.handler === "function" &&
          onCancel.handler();
        closeModal();
      },
      onSubmitHandler() {
        onSubmit?.handler &&
          typeof onSubmit.handler === "function" &&
          onSubmit.handler();
        closeModal();
      },
    }),
    [closeModal, onCancel, onSubmit]
  );

  return (
    <CustomModal
      visible={visibility}
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
