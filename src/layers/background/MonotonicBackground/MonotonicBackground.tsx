import styled from "styled-components";
import BackgroundLayer from "../BackgroundLayer";

interface IMonotonicBackgroundProps {
  color?: `#${string}`;
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
`;
