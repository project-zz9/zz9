import { FC, useMemo } from "react";
import FormTypeTextInput from "../FormTypeTextInput";

const schemaFormTypes: Record<string, FC<any> | null> = {
  "text-input": FormTypeTextInput,
  "date-input": null,
  "optional-input": null,
};

interface ISchemaForm<T> {
  formType: string;
  name: string;
  data: Record<string, string>;
  onChange: (value: T | ((prev: T) => T)) => void;
  error: string | null;
  jsonSchema: Record<string, any>;
}

function SchemaForm<T>({
  formType,
  name,
  data,
  onChange,
  error,
  jsonSchema,
}: ISchemaForm<T>) {
  const Input = useMemo(() => schemaFormTypes[formType], [formType]);
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
