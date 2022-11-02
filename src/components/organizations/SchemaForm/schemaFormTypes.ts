import type { FC } from "react";
import FormTypeRelationshipInput from "../FormTypeRelationshipInput";
import FormTypeDateInput from "../FormTypeDateInput";
import FormTypeTextInput from "../FormTypeTextInput";

const schemaFormTypes: Record<string, FC<any> | null> = {
  "text-input": FormTypeTextInput,
  "date-input": FormTypeDateInput,
  "relationship-input": FormTypeRelationshipInput,
};

export { schemaFormTypes };
