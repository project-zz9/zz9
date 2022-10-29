import { FC, useMemo } from "react";
import FormTypeTextInput from "../FormTypeTextInput";

const schemaFormTypes: Record<string, FC<any> | null> = {
  "text-input": FormTypeTextInput,
  "date-input": null,
  "optional-input": null,
};

interface ISchemaForm<T> {
  name: string;
  data: T;
  onChange: (value: T | ((prev: T) => T)) => void;
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
}: ISchemaForm<T>) {
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
