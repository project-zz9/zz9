import { ReactNode } from "react";
import styled from "styled-components";

interface ITitleLineProps {
  children: string | ReactNode;
}

function TitleLine({ children }: ITitleLineProps) {
  return <Title>{children}</Title>;
}

export default TitleLine;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;
