import { IconButton } from "@mui/material";
import { Fragment, useMemo } from "react";
import { HelpCircle, ToggleRight, X } from "react-feather";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { cards, cardShadow, logos } from "~/assets/images";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import PhotoCard from "~/components/atoms/PhotoCard";
import { ITabProps } from "~/components/organizations/InvitationTabs";
import { QRCodeCanvas } from "qrcode.react";

function InvitationCard({ uuid, visitor, tabNavigate, goBack }: ITabProps) {
  const { relationship } = visitor;
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );
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
          <Fragment>
            <PhotoCard
              source={cards[star].picked[distance]}
              shadow={cardShadow}
              width="90vw"
              filter={cards[star].filter}
              activate
              onClick={() => {
                tabNavigate?.("card");
              }}
            />
            <CardOverlay>
              <CardHeaderFrame>
                <LogoFrame>
                  <Logo src={logos.Logo2W} alt="logo" />
                </LogoFrame>
                <IconFrame>
                  <IconButton>
                    <ToggleRight />
                  </IconButton>
                </IconFrame>
              </CardHeaderFrame>
              <QRCodeFrame>
                <QRcodeGuid>
                  <div>QR코드를 지수에게 보여주고</div>
                  <div>전시에 입장해주세요.</div>
                </QRcodeGuid>
                <QRCodeCanvas
                  value={uuid}
                  style={{
                    height: "40vw",
                    width: "40vw",
                    outline: "10px solid #FFF",
                  }}
                />
              </QRCodeFrame>
            </CardOverlay>
          </Fragment>
        )}
      </CardFrame>
      <ButtonGroupFrame>
        <MonotonicButton>링크 복사</MonotonicButton>
        <MonotonicButton color="secondary">뒤집기</MonotonicButton>
      </ButtonGroupFrame>
    </CardRoot>
  );
}

export default InvitationCard;

const CardRoot = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;
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
  margin-top: 2rem;
  &:first-child {
    z-index: -1;
  }
  &:last-child {
    z-index: 1;
  }
`;

const CardOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  padding: 5.5vw;
  inset: 0;
  color: #fff;
`;

const CardHeaderFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
const LogoFrame = styled.div`
  width: 25vw;
`;

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const IconFrame = styled.div`
  button {
    color: #fff;
  }
`;

const QRCodeFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vw;
`;
const QRcodeGuid = styled.div`
  font-size: 5vw;
  font-weight: 500;
  text-align: center;
  margin: 7.5vw;
`;

const ButtonGroupFrame = styled.div`
  flex-direction: row;
  display: flex;
  margin-top: 1rem;
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
