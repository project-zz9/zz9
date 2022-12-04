import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface IMonotonicMuttonProps {
  type: "outlined" | "contained";
  background: "primary" | "black" | "white";
  font: "primary" | "black" | "white";
  disabled?: boolean;
  onClick?: () => void;
  children: string | ReactNode;
}

function MonotonicButton({
  type,
  background,
  font,
  disabled = false,
  onClick,
  children,
}: IMonotonicMuttonProps) {
  return (
    <MonotonicButtonInner
      disabled={disabled}
      variant={type}
      background={background}
      font={font}
      fullWidth
      onClick={onClick}
    >
      {children}
    </MonotonicButtonInner>
  );
}
export default MonotonicButton;

const MonotonicButtonInner = styled(Button)<
  ButtonProps & {
    background: "primary" | "black" | "white";
    font: "primary" | "black" | "white";
  }
>(({ font, background, variant }) => ({
  fontSize: "1.05rem",

  color: font,

  ...(variant === "contained"
    ? {
        backgroundColor: background === "primary" ? "#FF5A0D" : background,
        border: `2px solid ${
          background === "primary" ? "#FF5A0D" : background
        }`,
      }
    : {
        backgroundColor:
          font === "primary" ? "black" : font === "black" ? "white" : "black",
        border: `2px solid ${background === "primary" ? "#FF5A0D" : font}`,
      }),

  fontWeight: "bold",
  padding: "0.5rem 1.1rem",
  borderRadius: "7.5px",
  "&:hover": {
    ...(variant === "contained"
      ? {
          backgroundColor: background === "primary" ? "#FF5A0D" : background,
          border: `2px solid ${
            background === "primary" ? "#FF5A0D" : background
          }`,
        }
      : {
          backgroundColor:
            font === "primary" ? "black" : font === "black" ? "white" : "black",
          border: `2px solid ${background === "primary" ? "#FF5A0D" : font}`,
        }),
  },
  "&:focus": {
    ...(variant === "contained"
      ? {
          backgroundColor: background === "primary" ? "#FF5A0D" : background,
          border: `2px solid ${
            background === "primary" ? "#FF5A0D" : background
          }`,
        }
      : {
          backgroundColor:
            font === "primary" ? "black" : font === "black" ? "white" : "black",
          border: `2px solid ${background === "primary" ? "#FF5A0D" : font}`,
        }),
  },
  "&[disabled]": {
    color: "white",
    opacity: 0.5,
    backgroundColor: background === "primary" ? "#D8D8D8" : "#505050",
    border: `2px solid ${background === "primary" ? "#D8D8D8" : "#505050"}`,
  },
}));
