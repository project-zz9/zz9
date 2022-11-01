import { Fragment } from "react";
import styled from "styled-components";

interface IEmphasisTitleProps {
  title: { type?: "common" | "emphasis"; span: string }[][];
}

function EmphasisTitle({ title }: IEmphasisTitleProps) {
  return (
    <Fragment>
      {title.map((line, index) => (
        <Line key={index}>
          {line.map(({ type, span }, i) =>
            type === "emphasis" ? (
              <Emphasis key={`${i}::${type}::${span}`}>{span}</Emphasis>
            ) : (
              <Common key={`${i}::${type}::${span}`}>{span}</Common>
            )
          )}
        </Line>
      ))}
    </Fragment>
  );
}

export default EmphasisTitle;

const Line = styled.div``;

const Common = styled.span`
  font-size: 1.1em;
  font-weight: 500;
`;

const Emphasis = styled.span`
  color: red;
  font-size: 1.1em;
  font-weight: bold;
`;
