import { Fragment } from "react";
import { ArrowRight } from "react-feather";
import styled from "styled-components";
import { cards, cardShadow } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";
import MultiLineText from "../MultiLineText";
import GoGuestBook from "./GoGuestBook";
import type { IVisitViewProp } from "./InvitationPortal";

function AfterVisit({ name, star, distance, onClickHandler }: IVisitViewProp) {
  return (
    <Fragment>
      <Title>
        <MultiLineText
          lines={[
            [{ value: name, type: "emphasis" }, { value: "님," }],
            [{ value: "지수의 지구에 와주셔서 감사해요." }],
          ]}
          size="1.45rem"
          color="#FFF"
          weight="bold"
        />
      </Title>
      <Card>
        {cards[star]?.picked?.[distance] && (
          <Fragment>
            <PhotoCard
              source={cards[star].picked[distance]}
              shadow={cardShadow}
              width="50vw"
              filter={cards[star].filter}
              activate
              onClick={onClickHandler}
            />
            <CardLabel>
              초대장
              <ArrowRight />
            </CardLabel>
          </Fragment>
        )}
      </Card>
      <GuestBookFrame>
        <GoGuestBook />
      </GuestBookFrame>
    </Fragment>
  );
}

export default AfterVisit;

const Title = styled.div`
  div {
    margin-top: 0.65rem;
  }
`;

const Card = styled.div`
  position: relative;
  align-self: center;
  transform: rotate(270deg);
  &:first-child {
    z-index: -1;
  }
  &:last-child {
    z-index: 1;
  }
`;

const CardLabel = styled.div`
  color: #fff;
  font-size: 5.5vw;
  font-weight: bold;
  position: absolute;
  bottom: 17.5vw;
  pointer-events: none;
  transform: rotate(90deg);
  svg {
    position: absolute;
    width: 8vw;
    height: 8vw;
    top: -1vw;
  }
`;

const GuestBookFrame = styled.div`
  width: 75vw;
`;
