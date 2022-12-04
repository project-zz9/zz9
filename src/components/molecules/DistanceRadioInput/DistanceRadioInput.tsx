import { Chip, ChipProps, styled } from "@mui/material";
import { Fragment } from "react";
import styledComponents, { css } from "styled-components";
import { getKey } from "~/utils/crypto";

interface IDistanceRadioInputProps<T> {
  title?: string;
  options?:
    | {
        value: string;
        description: string;
      }[]
    | undefined;
  data: T;
  setData: SetState<T>;
}

function DistanceRadioInput<T>({
  title,
  options,
  data,
  setData,
}: IDistanceRadioInputProps<T>) {
  return (
    <Fragment>
      {title && <Title>{title}</Title>}
      {options && (
        <OptionGroupFrame>
          {options.map(({ value, description }, index) => {
            return (
              <Distance
                key={getKey(index, value)}
                index={index}
                checked={data === value}
              >
                <DistanceOption
                  tabIndex={index}
                  label={value}
                  variant={data === value ? "filled" : "outlined"}
                  onClick={() => {
                    setData(value as T);
                  }}
                />
                {data === value && <Tooltip>{description}</Tooltip>}
              </Distance>
            );
          })}
        </OptionGroupFrame>
      )}
    </Fragment>
  );
}

export default DistanceRadioInput;

const Title = styledComponents.div`
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
`;

const OptionGroupFrame = styledComponents.div`
    display: flex;
    flex-direction: row;  
    height: 4.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const Distance = styledComponents.div<{ index: number; checked: boolean }>`
    display:flex;
    flex-direction: column;
    ${({ checked, index }) =>
      checked &&
      css`
        width: ${(index + 1) * 10 + 12}vw;
      `}
    margin-left: 2px;
    margin-right: 2px;
`;

const Tooltip = styledComponents.div`
    padding:5px;
    color: #FF8B5D;
    font-size: 3.2vw;
    font-wight: bold;
    text-align: center;
`;

const DistanceOption = styled(Chip)<ChipProps>(({ tabIndex }) => ({
  fontSize: "4vw",
  fontWeight: "bold",
  height: "1.8rem",
  justifyContent: "flex-start",
  border: "2px solid #FF5A0D",
  color: "#FFFFFF",
  transition: "background-color 250ms ease",
  "&.MuiChip-filled": {
    ...(tabIndex === 0
      ? {
          color: "#FFFFFF",
          backgroundColor: "#FF5A0D",
        }
      : tabIndex === 1
      ? {
          color: "#FF5A0D",
          backgroundColor: "#FFCCB9",
        }
      : {
          color: "#FF5A0D",
          backgroundColor: "#FCE9E6",
        }),
  },
  "&.MuiChip-outlined": {
    border: "2px solid #FF5A0D",
    backgroundColor: "transparent",
  },
}));
