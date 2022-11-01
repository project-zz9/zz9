import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeAdditionalInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {};
  options?: {};
}

function FormTypeAdditionalInput({}: IFormTypeAdditionalInputProps) {
  return <div>FormTypeAdditionalInput</div>;
}

export default FormTypeAdditionalInput;
