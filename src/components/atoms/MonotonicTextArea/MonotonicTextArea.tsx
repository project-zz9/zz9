import { alpha, styled, TextField, TextFieldProps } from "@mui/material";

interface IMonotonicTextAreaProps {
  rows?: number;
  maxRows?: number;
  label?: string;
  onChange: (value: string) => void;
}

function MonotonicTextArea({ onChange, ...props }: IMonotonicTextAreaProps) {
  return (
    <MonotonicTextField
      {...props}
      multiline
      fullWidth
      variant="outlined"
      onChange={({ target }) => onChange(target.value)}
    />
  );
}

export default MonotonicTextArea;

const MonotonicTextField = styled(TextField)<TextFieldProps>({
  backgroundColor: "transparent",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #FFF5",
    },
    "&:hover fieldset": {
      border: "2px solid #FFFA",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #FFFC",
    },
  },
  div: {
    color: "#FFF",
    fontSize: "1.05rem",
    border: "1px solid #FFF5",
  },
  label: {
    color: "#FFFA",
    "&.Mui-focused": {
      color: "#FFF",
    },
  },
});