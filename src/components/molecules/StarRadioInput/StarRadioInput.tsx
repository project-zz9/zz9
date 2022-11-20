import { Fragment } from "react";
import styled from "styled-components";
import { cards, cardShadow } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";
import { getKey } from "~/utils/crypto";

interface IStarRadioInputProps<T> {
  title?: string;
  options?:
    | {
        value: string;
      }[]
    | undefined;
  data: T;
  setData: (data: T | ((prev: T) => T)) => void;
}

function StarRadioInput<T>({
  title,
  options,
  data,
  setData,
}: IStarRadioInputProps<T>) {
  return (
    <Fragment>
      {title && <Title>{title}</Title>}
      {options && (
        <OptionGroupFrame>
          {options.map(({ value }, index) => {
            return (
              <PhotoCard
                key={getKey(index, value)}
                source={cards[value].normal}
                shadow={cardShadow}
                filter={cards[value].filter}
                activate={data === value}
                onClick={() => {
                  setData(value as T);
                }}
              />
            );
          })}
        </OptionGroupFrame>
      )}
    </Fragment>
  );
}

export default StarRadioInput;

const Title = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;

const OptionGroupFrame = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
