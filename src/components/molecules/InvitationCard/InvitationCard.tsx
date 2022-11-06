import { Fragment, useMemo } from "react";
import { HelpCircle, X } from "react-feather";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { cards, cardShadow } from "~/assets/images";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import PhotoCard from "~/components/atoms/PhotoCard";
import { ITabProps } from "~/components/organizations/InvitationTabs";

function InvitationCard({ visitor, tabNavigate }: ITabProps) {
  const { relationship } = visitor;
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );
  return (
    <CardRoot>
      <HeaderFrame>
        <X />
        <span>초대장</span>
        <HelpCircle />
      </HeaderFrame>
      <CardFrame>
        <Card>
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
              <CardOverlay></CardOverlay>
            </Fragment>
          )}
        </Card>
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
  background-color: #ff000050;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 1.3rem;
    font-weight: bold;
  }
  svg {
    height: 1.75rem;
    width: 1.75rem;
  }
  svg:last-child {
    color: #ff8b5d;
  }
`;
const CardFrame = styled.div``;

const Card = styled.div`
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
  color: #fff;
  font-size: 5.5vw;
  font-weight: bold;
  position: absolute;
  inset: 0;
  background-color: #ff000050;
  // svg {
  //   position: absolute;
  //   width: 8vw;
  //   height: 8vw;
  //   top: -1vw;
  //   right: 0;
  // }
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
