import { ReactNode } from "react";
import styled from "styled-components";

interface ISubTitleLineProps {
  children: string | ReactNode;
}

function SubTitleLine({ children }: ISubTitleLineProps) {
  return <SubTitle>{children}</SubTitle>;
}

export default SubTitleLine;

const SubTitle = styled.div`
  font-size: 1.2rem;
`;
