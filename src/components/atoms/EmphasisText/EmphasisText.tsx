import styled from "styled-components";
import { getKey } from "~/utils/crypto";

interface IEmphasisTextProps {
  text: EmphasisTextForm;
  size?: `${number}rem` | `${number}vw`;
  weight?: number | "bold";
  color?: string | "emphasis";
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
          <Emphasis key={getKey(i, type, value)} color={emphasisColor}>
            {value}
          </Emphasis>
        ) : (
          <Common key={getKey(i, type, value)} color={color} weight={weight}>
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
  color: ${({ color }) => (color === "emphasis" ? "#ff5a0d" : color || "#000")};
`;

const Emphasis = styled.span`
  color: ${({ color }) => color || "#ff5a0d"};
  font-weight: bold;
`;
