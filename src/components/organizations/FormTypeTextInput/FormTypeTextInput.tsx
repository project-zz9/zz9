import { Fragment, useEffect, useState } from "react";
import TextInputField from "~/components/atoms/TextInputField";
import MultiLineText from "~/components/molecules/MultiLineText";
import { phoneNumber } from "~/utils/number";

interface IFormTypeTextInputProps<T = Record<string, string>> {
  type: string;
  name: string;
  data: T;
  onChange: (data: T | ((prev: T) => T)) => void;
  label?: string;
  maxLength?: number;
  props?: {
    title: string | string[] | undefined;
  };
  options?: {
    format: "text" | "phoneNumber";
  };
  error: string | null;
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

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    onChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, [value]);

  return (
    <Fragment>
      <div>
        {props?.title && (
          <MultiLineText type="title" lines={props.title} data={data} />
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
