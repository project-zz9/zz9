import { Fragment } from "react";
import styled, { css } from "styled-components";

export type EmphasisText = { type?: "common" | "emphasis"; span: string }[][];

interface IEmphasisTitleProps {
  title: EmphasisText;
  size?: string;
  color?: string;
  emphasisColor?: string;
}

function EmphasisTitle({
  title,
  size,
  color,
  emphasisColor,
}: IEmphasisTitleProps) {
  return (
    <Fragment>
      {title.map((line, index) => (
        <Line key={index} size={size}>
          {line.map(({ type, span }, i) =>
            type === "emphasis" ? (
              <Emphasis key={`${i}::${type}::${span}`} color={color}>
                {span}
              </Emphasis>
            ) : (
              <Common key={`${i}::${type}::${span}`} color={emphasisColor}>
                {span}
              </Common>
            )
          )}
        </Line>
      ))}
    </Fragment>
  );
}

export default EmphasisTitle;

const Line = styled.div<{ size?: string }>`
  font-size: ${({ size }) => (size ? "" : "1.1em")};
`;

const Common = styled.span`
  font-weight: 500;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;

const Emphasis = styled.span`
  color: ${({ color }) => (color ? color : "#ff5a0d")};
  font-weight: bold;
`;
