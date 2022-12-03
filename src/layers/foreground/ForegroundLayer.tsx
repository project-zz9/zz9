import type { ReactNode } from "react";
import styled from "styled-components";
import { overflowYScroll } from "~/assets/styles/scroll";

interface IForegroundLayerProps {
  children: ReactNode;
}

function ForegroundLayer({ children }: IForegroundLayerProps) {
  return (
    <Root>
      <Content>{children}</Content>
    </Root>
  );
}

export default ForegroundLayer;

const Root = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  pointer-events: "none";
  ${overflowYScroll}
`;

const Content = styled.div`
  padding: 10px;
  pointer-events: all;
`;
