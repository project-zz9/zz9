import { Fragment, useMemo } from "react";
import { ArrowRight } from "react-feather";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { cards, cardShadow, logos } from "~/assets/images";
import PhotoCard from "~/components/atoms/PhotoCard";
import MultiLineText from "~/components/molecules/MultiLineText";

interface IInvitationPortalProps {
  visitor: VisitorData | undefined;
  onClick?: () => void;
}

function InvitationPortal({ visitor, onClick }: IInvitationPortalProps) {
  const { name, relationship } = visitor || {};
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );
  return name && relationship ? (
    <Fragment>
      <LogoFrame>
        <Logo src={logos.Logo2W} alt="logo" />
      </LogoFrame>
      <Title>
        <MultiLineText
          lines={[
            [{ value: name, type: "emphasis" }, { value: "님," }],
            [{ value: "지수의 지구에 오신 것을 환영해요." }],
          ]}
          size="1.45rem"
          color="#FFF"
          weight="bold"
        />
      </Title>
      <SubTitle>
        <MultiLineText
          lines={[
            [{ value: "전시를 보고나면 지수에게 말을 남길 수 있는" }],
            [{ value: "기회가 열려요." }],
          ]}
          size="1.1rem"
          color="#FFF"
          weight="bold"
        />
      </SubTitle>
      <Card>
        {cards[star]?.picked?.[distance] && (
          <Fragment>
            <PhotoCard
              source={cards[star].picked[distance]}
              shadow={cardShadow}
              width="70vw"
              filter={cards[star].filter}
              activate
              onClick={onClick}
            />
            <CardLabel>
              초대장 보러가기
              <ArrowRight />
            </CardLabel>
          </Fragment>
        )}
      </Card>
    </Fragment>
  ) : null;
}

export default InvitationPortal;

const LogoFrame = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 25vw;
`;

const Logo = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  div {
    margin-top: 0.65rem;
    margin-top: 0.65rem;
  }
`;
const SubTitle = styled.div`
  margin-top: 0.75rem;
  div {
    margin-top: 0.25rem;
    margin-top: 0.25rem;
  }
`;

const Card = styled.div`
  position: relative;
  align-self: center;
  margin-top: 3rem;
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
  left: 10vw;
  right: 10vw;
  bottom: 7.5vw;
  svg {
    position: absolute;
    width: 8vw;
    height: 8vw;
    top: -1vw;
    right: 0;
  }
`;
