import { FC, useCallback, useMemo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InvitationCard from "~/components/organizations/InvitationCard";
import InvitationPortal from "~/components/organizations/InvitationPortal";
import styled from "styled-components";

interface IInvitationTabsProps {
  uuid: string;
  visitor: Visitor;
  refetch: () => void;
}

export interface ITabProps {
  uuid: string;
  visitor: Visitor;
  tabNavigate: (tab: Tabs) => void;
  goBack: () => void;
  refetch: () => void;
}

export const enum Tabs {
  PORTAL = "portal",
  CARD = "card",
}
const tabs: Record<string, FC<ITabProps>> = {
  portal: InvitationPortal,
  card: InvitationCard,
};

function InvitationTabs({ uuid, visitor, refetch }: IInvitationTabsProps) {
  const [tabHistory, setTabHistory] = useState<Tabs[]>([Tabs.PORTAL]);

  const tab = useMemo(
    () => (tabHistory.length > 0 ? tabHistory[tabHistory.length - 1] : ""),
    [tabHistory]
  );
  const TabComponent = useMemo(() => (tab && tabs[tab]) || null, [tab]);

  const tabNavigate = useCallback((tab: Tabs) => {
    setTabHistory((history) => [...history, tab]);
  }, []);

  const goBack = useCallback(() => {
    tabHistory.length > 1
      ? setTabHistory((history) => history.slice(0, -1))
      : setTabHistory([Tabs.PORTAL]);
  }, [tabHistory]);

  return (
    <Root>
      <TransitionGroup>
        <CSSTransition key={tab} classNames="fade-absolute" timeout={500}>
          {TabComponent && (
            <TabComponent
              uuid={uuid}
              visitor={visitor}
              tabNavigate={tabNavigate}
              goBack={goBack}
              refetch={refetch}
            />
          )}
        </CSSTransition>
      </TransitionGroup>
    </Root>
  );
}

export default InvitationTabs;

const Root = styled.div`
  position: absolute;
  inset: 0 20px 0 20px;
`;
