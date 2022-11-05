import { Divider } from "@mui/material";
import { Calendar, Clock } from "react-feather";
import { Fragment, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MultiLineText from "~/components/molecules/MultiLineText";
import RadioGroupInput from "~/components/molecules/RadioGroupInput";
import { IFormTypeInputProps } from "../SchemaForm";
import { useQuery } from "~/hooks/useQuery";
import { MAX_VISITOR_ON_ONE_TIME } from "~/app/constant";

interface IFormTypeDateInputProps<T = Record<string, string>>
  extends IFormTypeInputProps<T> {
  props?: {
    title: EmphasisTextForm[];
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
  const timeTable: DateTime[] | null = useQuery(
    { collection: "schedule", method: "get" },
    date
  );
  const { title, date: dateProps, time: timeProps } = props || {};

  const dateOptions = useMemo(() => {
    const schedule = (timeTable || []).reduce((accumulator, { time }) => {
      accumulator.set(time, (accumulator.get(time) ?? 0) + 1);
      return accumulator;
    }, new Map<string, number>());

    return (timeProps?.options || []).map((time) => ({
      ...time,
      disabled: (schedule.get(time.value) || 0) >= MAX_VISITOR_ON_ONE_TIME,
    }));
  }, [timeProps, timeTable]);

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
      <div>
        {title && <MultiLineText lines={title} size="1.5rem" weight="bold" />}
      </div>
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
            options={date ? dateOptions : []}
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
