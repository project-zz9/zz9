import styled from "styled-components";
import ContentTable from "~/components/atoms/ContentTable";
import EmphasisTitle, { EmphasisText } from "~/components/atoms/EmphasisTitle";

interface IConfirmModalInnerProps {
  title: EmphasisText;
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
`;
