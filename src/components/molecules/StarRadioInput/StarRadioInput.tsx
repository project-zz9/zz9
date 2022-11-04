import { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { stars } from "~/assets/icons";

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
              <StarCard
                key={`${index}::${value}`}
                onClick={() => {
                  setData(value as T);
                }}
              >
                <Card
                  checked={data === value}
                  draggable={false}
                  src={stars[value].normal}
                  alt={value}
                />
                {data === value && (
                  <CheckedCard
                    draggable={false}
                    src={stars[value].checked}
                    alt={value}
                  />
                )}
              </StarCard>
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
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StarCard = styled.div`
  position: relative;
  width: 27vw;
`;

const Card = styled.img<{ checked: boolean }>`
  object-fit: cover;
  opacity: ${({ checked }) => (checked ? 0.75 : 0.35)};
  transition: opacity 500ms;
  height: 100%;
  width: 100%;
`;

const glow = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const CheckedCard = styled.img`
  object-fit: cover;
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  animation: ${glow} 2s infinite linear alternate;
`;
