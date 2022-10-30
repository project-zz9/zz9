import { FC, forwardRef } from "react";
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
import type { ModalParameter } from "~/stores/modal";
import MonotonicButton from "~/components/atoms/MonotonicButton";

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
    scroll: "paper",
    "aria-labelledby": "scroll-dialog-title",
    "aria-describedby": "scroll-dialog-description",
  },
};

interface ICustomModalProps {
  visible: boolean;
  type: ModalParameter["type"] | undefined;
  Element: FC | undefined;
  content:
    | {
        title?: string;
        body: string;
      }
    | undefined;
  onSubmit?: {
    label?: string;
  };
  onCancel?: {
    label?: string;
  };
  onSubmitHandler: () => void;
  onCancelHandler: () => void;
}

function CustomModal({
  visible,
  type,
  Element,
  content,
  onSubmit,
  onSubmitHandler,
  onCancel,
  onCancelHandler,
}: ICustomModalProps) {
  return (
    <Dialog
      open={visible}
      onClose={onCancelHandler}
      {...(type ? modalTypeProps[type] : {})}
    >
      {Element ? (
        <Element />
      ) : (
        <>
          {content?.title && (
            <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
          )}
          <DialogContent dividers={type === "fullscreen"}>
            <DialogContentText id="alert-dialog-description">
              {content?.body}
            </DialogContentText>
          </DialogContent>
        </>
      )}
      {(onSubmit || onCancel) && (
        <DialogActions>
          {onCancel && (
            <MonotonicButton variant="outlined" onClick={onCancelHandler}>
              {onCancel?.label || "Cancel"}
            </MonotonicButton>
          )}
          {onSubmit && (
            <MonotonicButton variant="contained" onClick={onSubmitHandler}>
              {onSubmit?.label || "Submit"}
            </MonotonicButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomModal;
