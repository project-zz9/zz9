import { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import InvitationCard from "~/components/molecules/InvitationCard";
import InvitationPortal from "~/components/molecules/InvitationPortal";
import { HOME_PATH } from "~/pages";
import "~/assets/styles/fade-animation.css";

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
  const navigate = useNavigate();

  const tab = useMemo(() => tabHistory.at(-1), [tabHistory]);
  const TabComponent = useMemo(() => (tab && tabs[tab]) || null, [tab]);

  const tabNavigate = useCallback((tab: string) => {
    setTabHistory((history) => [...history, tab]);
  }, []);

  const goBack = useCallback(() => {
    tabHistory.length > 0
      ? setTabHistory((history) => history.slice(0, -1))
      : navigate(HOME_PATH);
  }, [navigate, tabHistory]);

  return (
    <TransitionGroup>
      <CSSTransition key={tab} classNames="fade" timeout={250}>
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
  );
}

export default InvitationTabs;
