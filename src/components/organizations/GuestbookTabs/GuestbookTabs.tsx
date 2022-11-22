import { FC, useCallback, useMemo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

interface IGuestbookTabsProps {
  uuid: string;
  visitor: Visitor;
}

export interface ITabProps {
  uuid: string;
  visitor: Visitor;
  tabNavigate: (tab: Tabs) => void;
  goBack: () => void;
}

export const enum Tabs {
  PAPER = "paper",
  SEND = "send",
}

const tabs: Record<string, FC<ITabProps>> = {};

function GuestbookTabs({ uuid, visitor }: IGuestbookTabsProps) {
  const [tabHistory, setTabHistory] = useState<Tabs[]>([Tabs.PAPER]);

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
      : setTabHistory([Tabs.PAPER]);
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

export default GuestbookTabs;

const Root = styled.div`
  position: absolute;
  inset: 0 20px 0 20px;
`;
