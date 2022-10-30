import styled from "styled-components";

interface IConfirmModalInnerProps {
  title: string[];
  contents: {
    label: string;
    value: string;
  }[];
}

function ConfirmModalInner({ title, contents }: IConfirmModalInnerProps) {
  return (
    <ConfirmModalRoot>
      <TitleFrame>
        {title.map((line, index) => (
          <div key={`${index}::${line}`}>{line}</div>
        ))}
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
