import { IconButton } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { HelpCircle, X } from "react-feather";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { cards, cardShadow } from "~/assets/images";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import { ITabProps } from "~/components/organizations/InvitationTabs";
import PhotoCard from "~/components/atoms/PhotoCard";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { overflowYScroll } from "~/assets/styles/scroll";
import { modalControlAtom } from "~/stores/modal";
import { useAtom } from "jotai";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeCard from "~/components/molecules/InvitationTabs/QRCodeCard";
import InformationCard from "~/components/molecules/InvitationTabs/InformationCard";

function InvitationCard({ uuid, visitor, goBack, refetch }: ITabProps) {
  const { relationship, visited } = visitor;
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );
  const [, setModal] = useAtom(modalControlAtom);
  const [face, flipFace] = useState<"QRCODE" | "INFORMATION">("QRCODE");

  const onFlip = () =>
    flipFace((face) => (face === "QRCODE" ? "INFORMATION" : "QRCODE"));
  const onPressCard = useCallback(() => {
    if (visited) {
      goBack();
    } else {
      face === "QRCODE" &&
        setModal({
          type: "information",
          Element: () => (
            <QrModalFrame>
              <QRCodeCanvas
                value={uuid}
                style={{
                  height: "80vw",
                  width: "80vw",
                  outline: "10px solid #FFF",
                }}
              />
            </QrModalFrame>
          ),
          onCancel: {
            handler: () => {
              refetch();
            },
            hide: true,
          },
        });
    }
  }, [visited, face, goBack, setModal, uuid, refetch]);

  return (
    <CardRoot>
      <HeaderFrame>
        <IconButton onClick={goBack}>
          <X />
        </IconButton>
        <span>초대장</span>
        <IconButton>
          <HelpCircle />
        </IconButton>
      </HeaderFrame>
      <CardFrame>
        {cards[star]?.picked?.[distance] && (
          <Card onClick={onPressCard}>
            <PhotoCard
              source={cards[star].picked[distance]}
              shadow={cardShadow}
              width="85vw"
              filter={cards[star].filter}
              activate
              blur={face === "INFORMATION"}
            />
            <TransitionGroup>
              <CSSTransition key={face} classNames="fade" timeout={500}>
                <CardOverlay>
                  {face === "QRCODE" ? (
                    <QRCodeCard
                      uuid={uuid}
                      isVisited={Boolean(visited)}
                      onFlip={onFlip}
                    />
                  ) : (
                    <InformationCard visitor={visitor} onFlip={onFlip} />
                  )}
                </CardOverlay>
              </CSSTransition>
            </TransitionGroup>
          </Card>
        )}
      </CardFrame>
      <ButtonGroupFrame>
        <MonotonicButton color="secondary" onClick={onFlip}>
          뒤집기
        </MonotonicButton>
      </ButtonGroupFrame>
    </CardRoot>
  );
}

export default InvitationCard;

const CardRoot = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${overflowYScroll}
`;

const HeaderFrame = styled.div`
  color: #fff;
  height: 10vw;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    svg {
      color: #fff;
      height: 1.75rem;
      width: 1.75rem;
    }
    &:last-child {
      svg {
        color: #ff8b5d;
      }
    }
  }
  span {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const CardFrame = styled.div`
  position: relative;
  align-self: center;
  &:first-child {
    z-index: -1;
  }
  &:last-child {
    z-index: 1;
  }
`;

const Card = styled.div`
  position: relative;
`;

const CardOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  margin: 5.5vw;
  inset: 0;
  color: #fff;
  border-radius: 10px;
  ${overflowYScroll}
`;

const ButtonGroupFrame = styled.div`
  flex-direction: row;
  display: flex;
  margin: 0 2rem 1rem 2rem;
  button {
    padding: 10px;
    margin: 10px;
  }
  button:first-child {
    border: 2px solid #fff;
    &:focus: {
      border: 2px solid #fff;
    }
    &:hover {
      border: 2px solid #fff;
    }
  }
`;

const QrModalFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86vw;
  height: 86vw;
`;
