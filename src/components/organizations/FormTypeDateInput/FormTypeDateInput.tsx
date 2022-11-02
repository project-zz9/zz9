import { Divider } from "@mui/material";
import { Calendar, Clock } from "react-feather";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import MultiLineText from "~/components/molecules/MultiLineText";
import RadioGroupInput from "~/components/molecules/RadioGroupInput";
import { IFormTypeInputProps } from "../SchemaForm";

interface IFormTypeDateInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {
    title: string[];
    date: {
      title: string;
      options: { label: string; value: string }[];
    };
    time: {
      title: string;
      options: { label: string; value: string }[];
    };
  };
}
function FormTypeDateInput({
  name,
  onChange,
  error,
  props,
}: IFormTypeDateInputProps) {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const { title, date: dateProps, time: timeProps } = props || {};

  useEffect(() => {
    if (date && time) {
      onChange((prev) => ({
        ...prev,
        [name]: `${date} ${time}`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  return (
    <Fragment>
      <div>{title && <MultiLineText type="title" lines={title} />}</div>
      <RadioGroupFrame>
        {dateProps && (
          <RadioGroupInput
            title={dateProps.title}
            Icon={Calendar}
            value={date}
            setValue={setDate}
            options={dateProps.options}
          />
        )}
      </RadioGroupFrame>
      <Divider />
      <RadioGroupFrame>
        {timeProps && (
          <RadioGroupInput
            title={timeProps.title}
            Icon={Clock}
            value={time}
            setValue={setTime}
            options={date ? timeProps.options : []}
          />
        )}
      </RadioGroupFrame>
    </Fragment>
  );
}

export default FormTypeDateInput;

const RadioGroupFrame = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
