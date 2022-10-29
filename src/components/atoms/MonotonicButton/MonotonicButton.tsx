import styled from "@emotion/styled";
import Button, { ButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";

interface IMonotonicMuttonProps {
  children: string | ReactNode;
  onClick: () => void;
}

function MonotonicButton({ children, onClick }: IMonotonicMuttonProps) {
  return (
    <MonotonicButtonInner
      variant="contained"
      fullWidth
      onClick={
        onClick
        // const result = validate(data);
        // if (result) {
        //   if (stages.length > stage + 1) {
        //     setStage((prev) => prev + 1);
        //   } else {
        //     console.log("VALIDATE");
        //   }
        //   setError(null);
        // } else {
        //   setError(validate.errors?.[0].message || null);
        // }
      }
    >
      {children}
    </MonotonicButtonInner>
  );
}

export default MonotonicButton;

const MonotonicButtonInner = styled(Button)<ButtonProps>({
  color: "white",
  padding: 10,
  fontSize: "1.05rem",
  backgroundColor: "black",
  "&:hover": {
    backgroundColor: "black",
  },
});
