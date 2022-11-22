import { useCallback } from "react";
import styled from "styled-components";
import MonotonicTextArea from "~/components/atoms/MonotonicTextArea";
import { ITabProps } from "~/components/organizations/GuestbookTabs";
import MultiLineText from "../../MultiLineText";

function GuestbookPaper({ setData }: ITabProps) {
  const onChangeHandler = useCallback(
    (value: string) => {
      setData((prev) => ({ ...prev, message: value }));
    },
    [setData]
  );
  return (
    <RootFrame>
      <Title>
        <MultiLineText
          lines={[
            [{ value: "지수의 지구 한 켠에" }],
            [{ value: "남겨질 당신의 이야기" }],
          ]}
          color="#fff"
          weight={500}
          size="1.4rem"
        />
      </Title>

      <SubTitle>
        <MultiLineText
          lines={[
            [
              {
                value: "아래 편지지를 눌러 방명록을 작성해보세요.",
              },
            ],
          ]}
          color="emphasis"
          weight={500}
          size="1rem"
        />
      </SubTitle>
      <PaperFrame>
        <MonotonicTextArea
          onChange={onChangeHandler}
          minRows={8}
          maxRows={15}
        />
      </PaperFrame>
    </RootFrame>
  );
}

export default GuestbookPaper;

const RootFrame = styled.div`
  margin-top: 5vh;
`;
const Title = styled.div`
  margin-bottom: 1rem;
`;
const SubTitle = styled.div`
  margin-bottom: 2rem;
`;
const PaperFrame = styled.div``;
