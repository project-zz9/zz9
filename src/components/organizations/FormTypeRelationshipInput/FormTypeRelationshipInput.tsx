import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeRelationshipInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {};
  options?: {};
}

function FormTypeRelationshipInput({
  name,
  data,
  onChange,
  label,
  error,
  props,
  options,
}: IFormTypeRelationshipInputProps) {
  return <div>FormTypeAdditionalInput</div>;
}

export default FormTypeRelationshipInput;
