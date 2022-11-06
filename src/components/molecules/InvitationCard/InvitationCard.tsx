import { IconButton } from "@mui/material";
import { useMemo, useState } from "react";
import { HelpCircle, X } from "react-feather";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { cards } from "~/assets/images";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import { ITabProps } from "~/components/organizations/InvitationTabs";
import InformationCard from "./InformationCard";
import QRCodeCard from "./QRCodeCard";

function InvitationCard({ uuid, visitor, tabNavigate, goBack }: ITabProps) {
  const { relationship } = visitor;
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );
  const [face, flipFace] = useState<boolean>(true);

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
        {cards[star]?.picked?.[distance] &&
          (face ? (
            <QRCodeCard
              uuid={uuid}
              source={cards[star].picked[distance]}
              filter={cards[star].filter}
              onFlip={() => flipFace((face) => !face)}
            />
          ) : (
            <InformationCard
              visitor={visitor}
              source={cards[star].picked[distance]}
              filter={cards[star].filter}
              onFlip={() => flipFace((face) => !face)}
            />
          ))}
      </CardFrame>
      <ButtonGroupFrame>
        <MonotonicButton>링크 복사</MonotonicButton>
        <MonotonicButton
          color="secondary"
          onClick={() => flipFace((face) => !face)}
        >
          뒤집기
        </MonotonicButton>
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
