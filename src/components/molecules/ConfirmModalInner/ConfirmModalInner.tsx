import styled from "styled-components";
import ContentTable from "~/components/atoms/ContentTable";
import EmphasisText from "~/components/atoms/EmphasisText";

interface IConfirmModalInnerProps {
  title: EmphasisTextForm;
  contents: {
    label: string;
    value: string;
  }[];
}

function ConfirmModalInner({ title, contents }: IConfirmModalInnerProps) {
  return (
    <ConfirmModalRoot>
      <TitleFrame>
        <EmphasisText title={title} />
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
