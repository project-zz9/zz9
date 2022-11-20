import styled from "styled-components";
import ContentTable, { TableContent } from "~/components/atoms/ContentTable";
import MultiLineText from "../MultiLineText";

interface IConfirmModalInnerProps {
  title: EmphasisTextForm[];
  titleSize?: `${number}rem`;
  contents: TableContent[];
}

function ConfirmModalInner({
  title,
  titleSize,
  contents,
}: IConfirmModalInnerProps) {
  return (
    <ConfirmModalRoot>
      <TitleFrame>
        <MultiLineText
          lines={title}
          {...(titleSize ? { size: titleSize } : {})}
        />
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
