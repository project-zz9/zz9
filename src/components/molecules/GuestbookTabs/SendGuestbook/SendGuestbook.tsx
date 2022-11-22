import { useCallback } from "react";
import styled from "styled-components";
import MonotonicTextInput from "~/components/atoms/MonotonicTextInput";
import { ITabProps } from "~/components/organizations/GuestbookTabs";
import MultiLineText from "../../MultiLineText";

function SendGuestbook({ setData }: ITabProps) {
  const onChangeHandler = useCallback(
    (value: string) => {
      setData((prev) => ({ ...prev, displayName: value }));
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
                value: "당신의 이야기는 이제 지수의 지구 곁의 별이 됩니다.",
              },
            ],
            [
              {
                value: "별의 이름을 무엇으로 하시겠어요?",
              },
            ],
          ]}
          color="emphasis"
          weight={500}
          size="0.9rem"
        />
      </SubTitle>
      <PaperFrame>
        <MonotonicTextInput onChange={onChangeHandler} />
      </PaperFrame>
    </RootFrame>
  );
}

export default SendGuestbook;

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
