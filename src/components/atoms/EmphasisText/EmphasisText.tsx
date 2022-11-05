import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";

interface IEmphasisTextProps {
  text: EmphasisTextForm;
  size?: `${number}rem`;
  weight?: number | "bold";
  color?: string;
  emphasisColor?: string;
}

function EmphasisText({
  text,
  size,
  weight,
  color,
  emphasisColor,
}: IEmphasisTextProps) {
  return (
    <Line size={size}>
      {text.map(({ type, value }, i) =>
        type === "emphasis" ? (
          <Emphasis
            key={`${i}${SEPARATOR}${type}${SEPARATOR}${value}`}
            color={emphasisColor}
          >
            {value}
          </Emphasis>
        ) : (
          <Common
            key={`${i}${SEPARATOR}${type}${SEPARATOR}${value}`}
            color={color}
            weight={weight}
          >
            {value}
          </Common>
        )
      )}
    </Line>
  );
}

export default EmphasisText;

const Line = styled.div<{ size?: string }>`
  font-size: ${({ size }) => size || "1.1rem"};
`;

const Common = styled.span<{ weight?: number | "bold" }>`
  font-weight: ${({ weight }) => weight ?? 500};
  color: ${({ color }) => color || "#000"};
`;

const Emphasis = styled.span`
  color: ${({ color }) => color || "#ff5a0d"};
  font-weight: bold;
`;
