import type { ReactNode } from "react";
import styled from "styled-components";

interface IBackgroundLayerProps {
  children: ReactNode;
}

function BackgroundLayer({ children }: IBackgroundLayerProps) {
  return <BackgroundFrame>{children}</BackgroundFrame>;
}

export default BackgroundLayer;

const BackgroundFrame = styled.div`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0px;
  z-index: -1;
  pointer-events: none;
`;
