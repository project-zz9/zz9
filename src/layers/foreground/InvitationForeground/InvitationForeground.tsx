import { IconButton } from "@mui/material";
import { ArrowLeft } from "react-feather";
import styled from "styled-components";
import EmphasisText from "~/components/atoms/EmphasisText";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import { useQuery } from "~/hooks/useQuery";
import ForegroundLayer from "../ForegroundLayer";
import { cards, cardShadow } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "~/pages";
import { useMemo } from "react";
import { SEPARATOR } from "~/app/constant";
import { useAtom } from "jotai";
import { modalControlAtom } from "~/stores/modal";

interface IInvitationForegroundProps {
  uuid: string | undefined;
}

function InvitationForeground({ uuid }: IInvitationForegroundProps) {
  const navigate = useNavigate();
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
              navigate(HOME_PATH);
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
              if (navigator.share) {
                navigator.share({
                  title: "지수의 지구",
                  url: "https://klumy.github.io/RhineLabs/",
                });
              } else {
                setModal({
                  type: "information",
                  content: {
                    title: "공유 실패",
                    body: "공유가 불가능한 환경입니다.",
                  },
                  onSubmit: {
                    label: "확인",
                  },
                });
              }
            }}
          >
            공유하기
          </MonotonicButton>

          <MonotonicButton
            color="primary"
            onClick={() => {
              navigate(HOME_PATH);
            }}
          >
            별 보러가기
          </MonotonicButton>
        </ButtonGroupFrame>
      </RootFrame>
    </ForegroundLayer>
  );
}

export default InvitationForeground;

const RootFrame = styled.div`
  display: flex;
  width: 85vw;
  height: 90vh;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 10vh;
`;

const GoBackButtonFrame = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;

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
  padding-bottom: min(100px, 20vw);
  button {
    margin: 10px;
  }
`;
