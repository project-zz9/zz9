import styled from "@emotion/styled";
import Button, { ButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

interface IMonotonicMuttonProps {
  variant?: "outlined" | "contained";
  onClick: () => void;
  children: string | ReactNode;
}

function MonotonicButton({
  variant = "contained",
  onClick,
  children,
}: IMonotonicMuttonProps) {
  return (
    <MonotonicButtonInner variant={variant} fullWidth onClick={onClick}>
      {children}
    </MonotonicButtonInner>
  );
}
export default MonotonicButton;

const MonotonicButtonInner = styled(Button)<ButtonProps>((props) => ({
  color: props.variant === "outlined" ? "black" : "white",
  padding: 10,
  fontSize: "1.05rem",
  backgroundColor:
    props.variant === "outlined" ? "rgba(25, 118, 210, 0.04)" : "black",
  borderColor: props.variant === "outlined" ? "black" : "white",
  borderWidth: 2,
  fontWeight: "bold",
  "&:hover": {
    backgroundColor:
      props.variant === "outlined" ? "rgba(25, 118, 210, 0.04)" : "black",
    borderColor: props.variant === "outlined" ? "black" : "white",
    borderWidth: 2,
  },
  "&:focus": {
    backgroundColor:
      props.variant === "outlined" ? "rgba(25, 118, 210, 0.04)" : "black",
    borderColor: props.variant === "outlined" ? "black" : "white",
    borderWidth: 2,
  },
}));
