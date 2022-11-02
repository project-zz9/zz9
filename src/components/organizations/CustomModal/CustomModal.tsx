import { FC, forwardRef, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  DialogProps,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import type { ModalParameter } from "~/stores/modal";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import styled from "styled-components";

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
    sx: {
      "& .MuiPaper-root": {
        margin: 0,
        width: "86vw",
        border: "5px solid white",
        borderRadius: "10px",
      },
    },
  },
  confirm: {
    keepMounted: true,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    sx: {
      "& .MuiPaper-root": {
        margin: 0,
        width: "86vw",
        border: "5px solid white",
        borderRadius: "10px",
      },
    },
  },
  fullscreen: {
    fullScreen: true,
    TransitionComponent: Transition,
    "aria-labelledby": "scroll-dialog-title",
    "aria-describedby": "scroll-dialog-description",
  },
};

interface ICustomModalProps {
  visible: boolean;
  type: ModalParameter["type"] | undefined;
  hash: string;
  Element:
    | FC<{
        activate?: (active: boolean | ((prev: boolean) => boolean)) => void;
      }>
    | undefined;
  content:
    | {
        title?: string;
        body: string;
      }
    | undefined;
  onSubmit?: {
    label?: string;
    hide?: boolean;
  };
  onCancel?: {
    label?: string;
    hide?: boolean;
  };
  onSubmitHandler: () => void;
  onCancelHandler: () => void;
}

function CustomModal({
  visible,
  type,
  hash,
  Element,
  content,
  onSubmit,
  onSubmitHandler,
  onCancel,
  onCancelHandler,
}: ICustomModalProps) {
  const [activate, setActivate] = useState<boolean>(true);
  useEffect(() => {
    setActivate(true);
  }, [hash]);
  return (
    <Dialog
      open={visible}
      onClose={onCancelHandler}
      {...(type ? modalTypeProps[type] : {})}
    >
      <DialogContentFrame>
        {Element ? (
          <Element activate={setActivate} />
        ) : (
          <>
            {content?.title && (
              <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
            )}
            <DialogContent dividers={type === "fullscreen"}>
              <DialogContentText>{content?.body}</DialogContentText>
            </DialogContent>
          </>
        )}
      </DialogContentFrame>

      {(onSubmit || onCancel) && (
        <DialogActions>
          {onCancel && !onCancel.hide && (
            <ButtonFrame>
              <MonotonicButton type="outlined" onClick={onCancelHandler}>
                {onCancel?.label || "Cancel"}
              </MonotonicButton>
            </ButtonFrame>
          )}
          {onSubmit && !onSubmit.hide && (
            <ButtonFrame>
              <MonotonicButton
                type="contained"
                onClick={onSubmitHandler}
                disabled={!activate}
              >
                {onSubmit?.label || "Submit"}
              </MonotonicButton>
            </ButtonFrame>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomModal;

const DialogContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const DialogActions = styled.div`
  display: flex;
`;

const ButtonFrame = styled.div`
  flex: 1;
  padding: 15px 10px 15px 10px;
  &:first-child {
    margin-left: 20px;
  }
  &:last-child {
    margin-right: 20px;
  }
`;
