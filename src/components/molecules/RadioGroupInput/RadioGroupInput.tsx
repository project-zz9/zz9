import { FC, Fragment } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import styled from "styled-components";
import { IconProps } from "react-feather";
import { getKey } from "~/utils/crypto";

interface IRadioGroupInputProps {
  Icon?: FC<IconProps>;
  title: string;
  value: string;
  setValue: (value: string | ((prev: string) => string)) => void;
  options: {
    label?: string;
    value: string;
    disabled?: boolean;
  }[];
}

function RadioGroupInput({
  Icon,
  title,
  value,
  setValue,
  options,
}: IRadioGroupInputProps) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };
  return (
    <Fragment>
      <TitleFrame>
        {Icon && <Icon style={{ color: "#FF5A0D", fontSize: "1.3rem" }} />}
        <Title>{title}</Title>
      </TitleFrame>
      <RadioGroupFrame>
        <RadioGroup value={value} onChange={handleChange}>
          {options.map(({ label, value, disabled }, index) => (
            <FormControlLabel
              key={getKey(index, label, value)}
              value={value}
              control={
                <Radio
                  disabled={disabled}
                  sx={{
                    padding: "7px",
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#FF5A0D",
                    },
                  }}
                />
              }
              label={label}
            />
          ))}
        </RadioGroup>
      </RadioGroupFrame>
    </Fragment>
  );
}

export default RadioGroupInput;

const TitleFrame = styled.div`
  margin: 10px;
`;
const Title = styled.div`
  display: inline;
  vertical-align: text-bottom;
  font-size: 1.1rem;
  margin-left: 7px;
  font-weight: 600;
`;

const RadioGroupFrame = styled.div`
  margin-left: 35px;
`;
