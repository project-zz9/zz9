import { useMemo } from "react";
import { schemaFormTypes } from "./schemaFormTypes";

export interface IFormTypeInputProps<T = Record<string, string>> {
  type: string;
  name: string;
  data: T;
  onChange: SetState<T>;
  label?: string;
  error: string | null;
}
interface ISchemaFormProps<T> {
  name: string;
  data: T;
  onChange: SetState<T>;
  error: string | null;
  jsonSchema: {
    formType: string;
    [key: string]: any;
  };
}

function SchemaForm<T>({
  name,
  data,
  onChange,
  error,
  jsonSchema,
}: ISchemaFormProps<T>) {
  const Input = useMemo(
    () => schemaFormTypes[jsonSchema.formType],
    [jsonSchema]
  );
  return (
    Input && (
      <Input
        name={name}
        data={data}
        onChange={onChange}
        error={error}
        {...jsonSchema}
      />
    )
  );
}

export default SchemaForm;
