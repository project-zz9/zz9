import { Fragment, useEffect, useState } from "react";
import TextInputField from "~/components/atoms/TextInputField";
import MultiLineText from "~/components/molecules/MultiLineText";
import { phoneNumber } from "~/utils/number";
import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeTextInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  maxLength?: number;
  props?: {
    title: EmphasisTextForm[] | undefined;
  };
  options?: {
    format: "text" | "phoneNumber";
  };
}

function FormTypeTextInput({
  name,
  data,
  maxLength,
  onChange,
  label,
  error,
  props,
  options,
}: IFormTypeTextInputProps) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue("");
  }, [name]);

  useEffect(() => {
    onChange((prev) => ({
      ...prev,
      [name]: value,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Fragment>
      <div>
        {props?.title && (
          <MultiLineText
            lines={props.title}
            data={data}
            size="1.5rem"
            weight="bold"
          />
        )}
      </div>
      <div>
        <TextInputField
          label={label ?? ""}
          value={value}
          onChange={(value) => {
            if (maxLength && maxLength < value.length) return;
            setValue(
              options?.format === "phoneNumber" ? phoneNumber(value) : value
            );
          }}
          error={error}
          options={{
            ...(options?.format === "phoneNumber"
              ? { inputProps: { inputMode: "numeric", pattern: "[0-9]*" } }
              : {}),
          }}
        />
      </div>
    </Fragment>
  );
}

export default FormTypeTextInput;
