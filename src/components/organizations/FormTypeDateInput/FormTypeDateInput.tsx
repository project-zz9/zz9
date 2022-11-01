import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeDateInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {};
  options?: {};
}
function FormTypeDateInput({}: IFormTypeDateInputProps) {
  return <div>FormTypeDateInput</div>;
}

export default FormTypeDateInput;
