import { IconButton } from "@mui/material";
import { ArrowLeft } from "react-feather";
import styled from "styled-components";
import EmphasisText from "~/components/atoms/EmphasisText";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { cards, cardShadow } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";
import { useHistory } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useMemo } from "react";
import { HOME, ROOT_PAGE, SEPARATOR } from "~/app/constant";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";

interface IInvitationPreviewForegroundProps {
  uuid: string | undefined;
}

function InvitationPreviewForeground({
  uuid,
}: IInvitationPreviewForegroundProps) {
  const history = useHistory();
  const [, setModal] = useAtom(modalControlAtom);

  const visitor = useQuery<VisitorData>(
    { collection: "visitor", method: "get" },
    uuid
  );

  const [distance, star] = useMemo(
    () => (visitor?.relationship ? visitor.relationship.split(SEPARATOR) : []),
    [visitor]
  );

  return (
    <ForegroundLayer>
      <RootFrame>
        <GoBackButtonFrame>
          <IconButton
            aria-label="go-back"
            onClick={() => {
              history.push(HOME_PATH);
            }}
          >
            <ArrowLeft color="#fff" />
          </IconButton>
        </GoBackButtonFrame>
        <Title>
          <EmphasisText
            text={[{ value: "전시 예약이 완료되었어요." }]}
            size="1.45rem"
            color="#fff"
            weight="bold"
          />
          <EmphasisText
            text={[{ value: "선택하신 별은 지수의 지구를 비출거에요." }]}
            size="1.1rem"
            color="#fff"
          />
        </Title>
        <Card>
          {cards[star]?.picked?.[distance] && (
            <PhotoCard
              source={cards[star].picked[distance]}
              shadow={cardShadow}
              width="70vw"
              filter={cards[star].filter}
              activate
            />
          )}
        </Card>
        <ButtonGroupFrame>
          <MonotonicButton
            color="secondary"
            onClick={() => {
              navigator.clipboard.writeText(ROOT_PAGE + HOME).then(
                () => {
                  setModal({
                    type: "information",
                    content: {
                      title: "복사 성공",
                      body: "클립보드에 복사하였습니다! 공유하고 싶은 곳에 붙여 넣으세요.",
                    },
                    onSubmit: {
                      label: "확인",
                    },
                  });
                },
                () => {
                  setModal({
                    type: "information",
                    content: {
                      title: "링크 복사 실패!",
                      body: "클립보드 복사에 실패하였습니다.",
                    },
                    onSubmit: {
                      label: "확인",
                    },
                  });
                }
              );
              // if (navigator.share) {
              //   navigator.share({
              //     title: "지수의 지구",
              //     url: "https://klumy.github.io/RhineLabs/",
              //   });
              // } else {
              //   setModal({
              //     type: "information",
              //     content: {
              //       title: "공유 실패",
              //       body: "공유가 불가능한 환경입니다.",
              //     },
              //     onSubmit: {
              //       label: "확인",
              //     },
              //   });
              // }
            }}
          >
            공유하기
          </MonotonicButton>

          <MonotonicButton
            color="primary"
            onClick={() => {
              history.push(HOME_PATH);
            }}
          >
            별 보러가기
          </MonotonicButton>
        </ButtonGroupFrame>
      </RootFrame>
    </ForegroundLayer>
  );
}

export default InvitationPreviewForeground;

const RootFrame = styled.div`
  display: flex;
  width: 85vw;
  height: 90vh;
  flex-direction: column;
  justify-content: flex-start;
`;

const GoBackButtonFrame = styled.div`
  margin-top: 15px;
  margin-left: -15px;
  margin-bottom: 1rem;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const Title = styled.div`
  text-align: center;
  div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const Card = styled.div`
  align-self: center;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const ButtonGroupFrame = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  padding-bottom: calc(5vh + 1rem);
  button {
    margin: 10px;
  }
`;
