import { FC } from "react";
import styled from "styled-components";

interface IConfirmModalInnerProps {
  Title: FC;
  contents: {
    label: string;
    value: string;
  }[];
}

function ConfirmModalInner({ Title, contents }: IConfirmModalInnerProps) {
  return (
    <ConfirmModalRoot>
      <TitleFrame>
        <Title />
      </TitleFrame>
      <ContentsFrame>
        {contents.map(({ label, value }, index) => (
          <div key={`${index}::${label}::${value}`}>
            <div>
              <div>{label}</div>
              <div>{value}</div>
            </div>
          </div>
        ))}
      </ContentsFrame>
    </ConfirmModalRoot>
  );
}
export default ConfirmModalInner;

const ConfirmModalRoot = styled.div`
  width: 80vw;
`;

const TitleFrame = styled.div`
  background-color: red;
`;

const ContentsFrame = styled.div`
  background-color: green;
`;
