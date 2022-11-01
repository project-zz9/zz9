import styled from "styled-components";
import ContentTable from "~/components/atoms/ContentTable";
import EmphasisTitle from "~/components/atoms/EmphasisTitle";

interface IConfirmModalInnerProps {
  title: {
    type?: "emphasis" | "common" | undefined;
    span: string;
  }[][];
  contents: {
    label: string;
    value: string;
  }[];
}

function ConfirmModalInner({ title, contents }: IConfirmModalInnerProps) {
  return (
    <ConfirmModalRoot>
      <TitleFrame>
        <EmphasisTitle title={title} />
      </TitleFrame>
      <ContentsFrame>
        <ContentTable contents={contents} />
      </ContentsFrame>
    </ConfirmModalRoot>
  );
}

export default ConfirmModalInner;

const ConfirmModalRoot = styled.div`
  width: 70vw;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleFrame = styled.div`
  flex: 1;
  text-align: center;
  margin-bottom: 20px;
`;

const ContentsFrame = styled.div`
  flex: 1;
  width: 50vw;
`;
