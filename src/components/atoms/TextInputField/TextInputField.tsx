import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import styledComponent from "styled-components";
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
    <div>
      <StyledTextField
        placeholder={label}
        fullWidth
        color="secondary"
        onChange={({ target }) => {
          onChange(target.value);
        }}
        value={value}
        error={!!error}
        {...(options || {})}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default TextInputField;

const StyledTextField = styled(InputBase)({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
    border: "1px solid #0E0E0E",
    fontSize: "1.15rem",
    padding: "0.8rem 0.9rem",
    transitionProperty: "border-color, background-color, box-shadow",
    transitionDuration: "300ms, 300ms, 300ms",
    transitionTimingFunction:
      "cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDelay: "0ms, 0ms, 0ms",

    "&:focus": {
      boxShadow: `${alpha("#000000", 0.25)} 0 0 0 0.2rem`,
      borderColor: "black",
    },
    "&[aria-invalid='true']": {
      borderColor: "#FF5A0D",
      color: "#FF5A0D",
      boxShadow: `${alpha("#FF5A0D", 0.25)} 0 0 0 0.2rem`,
      borderWidth: 1,
    },
  },
});

const ErrorMessage = styledComponent.div`
    position: absolute;
    margin-top: 0.25rem;
    margin-left: 0.75rem;
    font-size: 0.9rem;
    color: red;
`;
