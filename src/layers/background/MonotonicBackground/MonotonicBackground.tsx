import styled from "styled-components";
import BackgroundLayer from "../BackgroundLayer";

export type ColorCode = `#${string}`;

interface IMonotonicBackgroundProps {
  color?: ColorCode;
}

function MonotonicBackground({ color }: IMonotonicBackgroundProps) {
  return (
    <BackgroundLayer>
      <Background color={color} />
    </BackgroundLayer>
  );
}

export default MonotonicBackground;

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${(props) => props.color || "#fff"};
  transition: background-color 250ms ease;
`;
