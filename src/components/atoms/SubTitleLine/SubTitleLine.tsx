import { ReactNode } from "react";
import styled from "styled-components";

interface ISubTitleLineProps {
  children: string | ReactNode;
}

const SubTitle = styled.div`
  font-size: 1.2rem;
`;

function SubTitleLine({ children }: ISubTitleLineProps) {
  return <SubTitle>{children}</SubTitle>;
}

export default SubTitleLine;
