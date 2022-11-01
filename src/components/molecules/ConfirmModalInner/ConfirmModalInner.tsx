import { Fragment } from "react";
import styled from "styled-components";
import ContentTable from "~/components/atoms/ContentTable";
import EmphasisTitle from "~/components/atoms/EmphasisTitle";

interface IConfirmModalInnerProps {
  name: string | undefined;
  phoneNumber: string | undefined;
}

// [
//   ...(name ? [{ label: "이름", value: name }] : []),
//   ...(phoneNumber ? [{ label: "전화번호", value: phoneNumber }] : []),
// ];
function ConfirmModalInner({ name, phoneNumber }: IConfirmModalInnerProps) {
  return (
    <ConfirmModalRoot>
      <TitleFrame>
        <EmphasisTitle
          lines={[
            [
              {
                span: "이름과 전화번호가 맞는지",
              },
            ],
            [
              {
                type: "emphasis",
                span: "꼼꼼히",
              },
              {
                span: " 확인해주세요 🙏",
              },
            ],
          ]}
        />
      </TitleFrame>
      <ContentsFrame>
        <ContentTable
          contents={[
            ...(name ? [{ label: "이름", value: name }] : []),
            ...(phoneNumber ? [{ label: "전화번호", value: phoneNumber }] : []),
          ]}
        />
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
  background-color: green;
  flex: 1;
`;
