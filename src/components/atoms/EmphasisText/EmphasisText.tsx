import { Fragment } from "react";
import styled, { css } from "styled-components";

export type EmphasisTextForm = {
  type?: "common" | "emphasis";
  span: string;
}[][];

interface IEmphasisTextProps {
  title: EmphasisTextForm;
  size?: string;
  weight?: string;
  color?: string;
  emphasisColor?: string;
}

function EmphasisText({
  title,
  size,
  weight,
  color,
  emphasisColor,
}: IEmphasisTextProps) {
  return (
    <Fragment>
      {title.map((line, index) => (
        <Line key={index} size={size}>
          {line.map(({ type, span }, i) =>
            type === "emphasis" ? (
              <Emphasis key={`${i}::${type}::${span}`} color={emphasisColor}>
                {span}
              </Emphasis>
            ) : (
              <Common
                key={`${i}::${type}::${span}`}
                color={color}
                weight={weight}
              >
                {span}
              </Common>
            )
          )}
        </Line>
      ))}
    </Fragment>
  );
}

export default EmphasisText;

const Line = styled.div<{ size?: string }>`
  font-size: ${({ size }) => size || "1.1em"};
`;

const Common = styled.span<{ weight?: string }>`
  font-weight: ${({ weight }) => weight ?? 500};
  color: ${({ color }) => color || "white"};
`;

const Emphasis = styled.span`
  color: ${({ color }) => color || "#ff5a0d"};
  font-weight: bold;
`;
