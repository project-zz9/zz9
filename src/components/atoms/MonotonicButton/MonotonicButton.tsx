import styled from "@emotion/styled";
import Button, { ButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

interface IMonotonicMuttonProps {
  type?: "outlined" | "contained";
  onClick: () => void;
  children: string | ReactNode;
}

function MonotonicButton({
  type = "contained",
  onClick,
  children,
}: IMonotonicMuttonProps) {
  return (
    <MonotonicButtonInner variant={type} fullWidth onClick={onClick}>
      {children}
    </MonotonicButtonInner>
  );
}
export default MonotonicButton;

const MonotonicButtonInner = styled(Button)<ButtonProps>((props) => ({
  color: props.variant === "outlined" ? "black" : "white",
  fontSize: "1.05rem",
  backgroundColor:
    props.variant === "outlined" ? "rgba(25, 118, 210, 0.04)" : "black",
  border: "2px solid black",
  fontWeight: "bold",
  padding: "6px 16px",
  borderRadius: "7.5px",
  "&:hover": {
    backgroundColor:
      props.variant === "outlined" ? "rgba(25, 118, 210, 0.04)" : "black",
    border: "2px solid black",
  },
  "&:focus": {
    backgroundColor:
      props.variant === "outlined" ? "rgba(25, 118, 210, 0.04)" : "black",
    border: "2px solid black",
  },
}));
