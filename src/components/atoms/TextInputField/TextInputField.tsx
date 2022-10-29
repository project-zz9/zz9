import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

interface ITextInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  options?: Record<string, any>;
}

function TextInputField({
  label,
  value,
  onChange,
  error,
  options,
}: ITextInputFieldProps) {
  return (
    <StyledTextField
      label={label}
      fullWidth
      color="secondary"
      onChange={({ target }) => {
        onChange(target.value);
      }}
      value={value}
      variant="outlined"
      error={!!error}
      helperText={error}
      {...(options || {})}
    />
  );
}

export default TextInputField;

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});
