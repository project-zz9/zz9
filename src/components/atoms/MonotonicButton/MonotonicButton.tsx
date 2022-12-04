import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface IMonotonicMuttonProps {
  backgroundColor?: "primary" | "black" | "white";
  fontColor?: "primary" | "black" | "white";
  type?: "outlined" | "contained";
  disabled?: boolean;
  onClick?: () => void;
  children: string | ReactNode;
}

function MonotonicButton({
  backgroundColor = "black",
  fontColor = "white",
  type = "contained",
  disabled = false,
  onClick,
  children,
}: IMonotonicMuttonProps) {
  return (
    <MonotonicButtonInner
      disabled={disabled}
      variant={type}
      fontColor={fontColor}
      backgroundColor={backgroundColor}
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
    backgroundColor: "primary" | "black" | "white";
    fontColor: "primary" | "black" | "white";
  }
>(({ fontColor, backgroundColor, variant }) => ({
  fontSize: "1.05rem",

  color: fontColor,

  ...(variant === "contained"
    ? {
        backgroundColor:
          backgroundColor === "primary" ? "#FF5A0D" : backgroundColor,
        border: `2px solid ${
          backgroundColor === "primary" ? "#FF5A0D" : backgroundColor
        }`,
      }
    : {
        backgroundColor:
          fontColor === "primary"
            ? "black"
            : fontColor === "black"
            ? "white"
            : "black",
        border: `2px solid ${
          backgroundColor === "primary" ? "#FF5A0D" : fontColor
        }`,
      }),

  fontWeight: "bold",
  padding: "0.5rem 1.1rem",
  borderRadius: "7.5px",
  "&:hover": {
    ...(variant === "contained"
      ? {
          backgroundColor:
            backgroundColor === "primary" ? "#FF5A0D" : backgroundColor,
          border: `2px solid ${
            backgroundColor === "primary" ? "#FF5A0D" : backgroundColor
          }`,
        }
      : {
          backgroundColor:
            fontColor === "primary"
              ? "black"
              : fontColor === "black"
              ? "white"
              : "black",
          border: `2px solid ${
            backgroundColor === "primary" ? "#FF5A0D" : fontColor
          }`,
        }),
  },
  "&:focus": {
    ...(variant === "contained"
      ? {
          backgroundColor:
            backgroundColor === "primary" ? "#FF5A0D" : backgroundColor,
          border: `2px solid ${
            backgroundColor === "primary" ? "#FF5A0D" : backgroundColor
          }`,
        }
      : {
          backgroundColor:
            fontColor === "primary"
              ? "black"
              : fontColor === "black"
              ? "white"
              : "black",
          border: `2px solid ${
            backgroundColor === "primary" ? "#FF5A0D" : fontColor
          }`,
        }),
  },
  "&[disabled]": {
    color: "white",
    opacity: 0.5,
    backgroundColor: backgroundColor === "primary" ? "#D8D8D8" : "#505050",
    border: `2px solid ${
      backgroundColor === "primary" ? "#D8D8D8" : "#505050"
    }`,
  },
}));
