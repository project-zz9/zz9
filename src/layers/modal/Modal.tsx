import { useMemo } from "react";
import { useAtom } from "jotai";
import CustomModal from "~/components/organizations/CustomModal";
import { modalAtom, visibleAtom } from "~/stores/modal";

function Modal() {
  const [modal] = useAtom(modalAtom);
  const [visible, setVisible] = useAtom(visibleAtom);

  const { type, content, Element, onSubmit, onCancel } = modal || {};

  const { onCancelHandler, onSubmitHandler } = useMemo(
    () => ({
      onCancelHandler() {
        onCancel?.handler &&
          typeof onCancel.handler === "function" &&
          onCancel.handler();
        setVisible(false);
      },
      onSubmitHandler() {
        onSubmit?.handler &&
          typeof onSubmit.handler === "function" &&
          onSubmit.handler();
        setVisible(false);
      },
    }),
    [onCancel, onSubmit, setVisible]
  );

  return (
    <CustomModal
      visible={visible}
      type={type}
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
