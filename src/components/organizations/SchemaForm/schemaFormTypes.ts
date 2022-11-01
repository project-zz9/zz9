import type { FC } from "react";
import FormTypeAdditionalInput from "../FormTypeAdditionalInput";
import FormTypeDateInput from "../FormTypeDateInput";
import FormTypeTextInput from "../FormTypeTextInput";

const schemaFormTypes: Record<string, FC<any> | null> = {
  "text-input": FormTypeTextInput,
  "date-input": FormTypeDateInput,
  "additional-input": FormTypeAdditionalInput,
};

export { schemaFormTypes };
