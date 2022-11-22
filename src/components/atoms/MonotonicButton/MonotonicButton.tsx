import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface IMonotonicMuttonProps {
  type?: "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
  children: string | ReactNode;
}

function MonotonicButton({
  type = "contained",
  color = "inherit",
  disabled = false,
  onClick,
  children,
}: IMonotonicMuttonProps) {
  return (
    <MonotonicButtonInner
      disabled={disabled}
      variant={type}
      color={color}
      fullWidth
      onClick={onClick}
    >
      {children}
    </MonotonicButtonInner>
  );
}
export default MonotonicButton;

const MonotonicButtonInner = styled(Button)<ButtonProps>((props) => ({
  color:
    props.color === "secondary" || props.variant === "outlined"
      ? "black"
      : "white",
  fontSize: "1.05rem",
  backgroundColor:
    props.color === "primary"
      ? "#FF5A0D"
      : props.color === "secondary"
      ? "#FFFFFF"
      : props.variant === "outlined"
      ? "rgba(25, 118, 210, 0.04)"
      : "black",
  border: `2px solid ${
    props.color === "primary"
      ? "#FF5A0D"
      : props.color === "secondary"
      ? "#FFFFFF"
      : "black"
  }`,
  fontWeight: "bold",
  padding: "0.5rem 1.1rem",
  borderRadius: "7.5px",
  "&:hover": {
    backgroundColor:
      props.color === "primary"
        ? "#FF5A0D"
        : props.color === "secondary"
        ? "#FFFFFF"
        : props.variant === "outlined"
        ? "rgba(25, 118, 210, 0.04)"
        : "black",
    border: `2px solid ${
      props.color === "primary"
        ? "#FF5A0D"
        : props.color === "secondary"
        ? "#FFFFFF"
        : "black"
    }`,
  },
  "&:focus": {
    backgroundColor:
      props.color === "primary"
        ? "#FF5A0D"
        : props.color === "secondary"
        ? "#FFFFFF"
        : props.variant === "outlined"
        ? "rgba(25, 118, 210, 0.04)"
        : "black",
    border: `2px solid ${
      props.color === "primary"
        ? "#FF5A0D"
        : props.color === "secondary"
        ? "#FFFFFF"
        : "black"
    }`,
  },
  "&[disabled]": {
    backgroundColor: props.color === "primary" ? "#D8D8D8" : "#505050",
    color: "white",
    border: "2px solid #505050",
    opacity: 0.5,
  },
}));
