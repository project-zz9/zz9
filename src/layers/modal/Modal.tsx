import { forwardRef, useMemo } from "react";
import { useAtom } from "jotai";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  DialogProps,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

import { modalAtom, ModalParameter, visibleAtom } from "~/stores/modal";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const modalTypeProps: Record<ModalParameter["type"], Partial<DialogProps>> = {
  information: {
    keepMounted: true,
    fullWidth: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
  },
  confirm: {
    keepMounted: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
  },
  fullscreen: {
    fullScreen: true,
    TransitionComponent: Transition,
  },
};

function Modal() {
  const [modal] = useAtom(modalAtom);
  const [visible, setVisible] = useAtom(visibleAtom);

  const { type, content, elements, onSubmit, onCancel } = modal || {};

  const { onCancelHandler, onSubmitHandler } = useMemo(
    () => ({
      onCancelHandler() {
        if (onCancel?.handler && typeof onCancel.handler === "function") {
          onCancel.handler();
        }
        setVisible(false);
      },
      onSubmitHandler() {
        if (onSubmit?.handler && typeof onSubmit.handler === "function") {
          onSubmit.handler();
        }
        setVisible(false);
      },
    }),
    [onCancel, onSubmit, setVisible]
  );

  return (
    <Dialog
      open={visible}
      onClose={onCancelHandler}
      {...(type ? modalTypeProps[type] : {})}
    >
      {elements || (
        <>
          {content?.title && (
            <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
          )}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content?.body}
            </DialogContentText>
          </DialogContent>
        </>
      )}
      {(onSubmit || onCancel) && (
        <DialogActions>
          {onCancel && (
            <Button onClick={onCancelHandler}>
              {onCancel?.label || "Cancel"}
            </Button>
          )}
          {onSubmit && (
            <Button onClick={onSubmitHandler}>
              {onSubmit?.label || "Submit"}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default Modal;
