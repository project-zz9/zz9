import { Fragment, useMemo } from "react";
import { ArrowRight } from "react-feather";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { cards, cardShadow, logos } from "~/assets/images";
import { overflowYScroll } from "~/assets/styles/scroll";
import PhotoCard from "~/components/atoms/PhotoCard";
import MultiLineText from "~/components/molecules/MultiLineText";
import { ITabProps } from "~/components/organizations/InvitationTabs";

function InvitationPortal({ visitor, tabNavigate }: ITabProps) {
  const { name, relationship } = visitor;
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );
  return name && relationship ? (
    <PortalRoot>
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
              onClick={() => {
                tabNavigate?.("card");
              }}
            />
            <CardLabel>
              초대장 보러가기
              <ArrowRight />
            </CardLabel>
          </Fragment>
        )}
      </Card>
    </PortalRoot>
  ) : null;
}

export default InvitationPortal;

const PortalRoot = styled.div`
  height: 90vh;
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${overflowYScroll}
`;

const LogoFrame = styled.div`
  margin-top: 20px;
  margin-left: -20px;
  margin-bottom: 2rem;
  width: 25vw;
  align-self: flex-start;
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
  margin-bottom: 1rem;
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
  pointer-events: none;
  svg {
    position: absolute;
    width: 8vw;
    height: 8vw;
    top: -1vw;
    right: 0;
  }
`;
