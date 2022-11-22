import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { SEPARATOR } from "~/app/constant";
import { logos } from "~/assets/images";
import { overflowYScroll } from "~/assets/styles/scroll";
import { ITabProps } from "~/components/organizations/InvitationTabs";
import { GUESTBOOK_PATH } from "~/pages";
import AfterVisit from "./AfterVisit";
import BeforeVisit from "./BeforeVisit";

export interface IVisitViewProp {
  name: string;
  star: string;
  distance: string;
  onClickHandler: { card: () => void; button: () => void };
}

function InvitationPortal({ uuid, visitor, tabNavigate }: ITabProps) {
  const { name, relationship, visited } = visitor;
  const history = useHistory();
  const [distance, star] = useMemo(
    () => (relationship ? relationship.split(SEPARATOR) : []),
    [relationship]
  );

  const VisitView = useMemo(
    () => (visited ? AfterVisit : BeforeVisit),
    [visited]
  );

  const onClickHandler = useMemo(
    () => ({
      card: () => tabNavigate?.("card"),
      button: () =>
        visited && history.push(GUESTBOOK_PATH.replace(":uuid", uuid)),
    }),
    [history, tabNavigate, uuid, visited]
  );

  return name && relationship ? (
    <PortalRoot>
      <LogoFrame>
        <Logo src={logos.Logo2W} alt="logo" />
      </LogoFrame>
      <VisitView
        name={name}
        star={star}
        distance={distance}
        onClickHandler={onClickHandler}
      />
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
