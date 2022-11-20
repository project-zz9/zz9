import { FC, useCallback, useMemo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InvitationCard from "~/components/molecules/InvitationCard";
import InvitationPortal from "~/components/molecules/InvitationPortal";
import styled from "styled-components";

interface IInvitationTabsProps {
  uuid: string;
  visitor: VisitorData;
}

export interface ITabProps {
  uuid: string;
  visitor: VisitorData;
  tabNavigate?: (tab: string) => void;
  goBack?: () => void;
}

const tabs: Record<string, FC<ITabProps>> = {
  portal: InvitationPortal,
  card: InvitationCard,
};

function InvitationTabs({ uuid, visitor }: IInvitationTabsProps) {
  const [tabHistory, setTabHistory] = useState<string[]>(["portal"]);

  const tab = useMemo(
    () => (tabHistory.length > 0 ? tabHistory[tabHistory.length - 1] : ""),
    [tabHistory]
  );
  const TabComponent = useMemo(() => (tab && tabs[tab]) || null, [tab]);

  const tabNavigate = useCallback((tab: string) => {
    setTabHistory((history) => [...history, tab]);
  }, []);

  const goBack = useCallback(() => {
    tabHistory.length > 1
      ? setTabHistory((history) => history.slice(0, -1))
      : setTabHistory(["portal"]);
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
