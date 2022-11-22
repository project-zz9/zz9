import { Button, IconButton } from "@mui/material";
import { FC, useCallback, useMemo, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import EmphasisText from "~/components/atoms/EmphasisText";
import MonotonicButton from "~/components/atoms/MonotonicButton";
import GuestbookPaper from "~/components/molecules/GuestbookTabs/GuestbookPaper";
import SendGuestbook from "~/components/molecules/GuestbookTabs/SendGuestbook";
import { INVITATION_PATH } from "~/pages";

interface IGuestbookTabsProps {
  uuid: string;
  visitor: Visitor;
  setGuestbookData: SetState<GuestbookData>;
  sendGuestbook: () => void;
}

export interface ITabProps {
  uuid: string;
  visitor: Visitor;
  setData: SetState<GuestbookData>;
}

export const enum Tabs {
  PAPER = "paper",
  SEND = "send",
}

const tabOrder = [Tabs.PAPER, Tabs.SEND];

const tabs: Record<string, FC<ITabProps>> = {
  paper: GuestbookPaper,
  send: SendGuestbook,
};

function GuestbookTabs({
  uuid,
  visitor,
  setGuestbookData,
  sendGuestbook,
}: IGuestbookTabsProps) {
  const [tabHistory, setTabHistory] = useState<Tabs[]>([Tabs.PAPER]);
  const history = useHistory();
  const tab = useMemo(
    () =>
      tabHistory.length > 0 ? tabHistory[tabHistory.length - 1] : Tabs.PAPER,
    [tabHistory]
  );
  const TabComponent = useMemo(() => tabs[tab], [tab]);

  const tabNavigate = useCallback((tab: Tabs) => {
    setTabHistory((history) => [...history, tab]);
  }, []);

  const goBack = useCallback(() => {
    tabHistory.length > 1
      ? setTabHistory((history) => history.slice(0, -1))
      : history.push(INVITATION_PATH.replace(":uuid", uuid));
  }, [history, tabHistory, uuid]);

  const { goNext, hasNext } = useMemo(() => {
    const index = tabOrder.indexOf(tab) + 1;
    const hasNext = index < tabOrder.length;
    return {
      goNext: () => hasNext && tabNavigate(tabOrder[index]),
      hasNext,
    };
  }, [tab, tabNavigate]);

  return (
    <Root>
      <TopButtonFrame>
        <IconButton aria-label="go-back" onClick={goBack}>
          <ArrowLeft color="#fff" />
        </IconButton>
        {hasNext && (
          <Button aria-label="go-next" onClick={goNext}>
            <EmphasisText text={[{ value: "다음", type: "emphasis" }]} />
          </Button>
        )}
      </TopButtonFrame>

      <TransitionGroup>
        <CSSTransition key={tab} classNames="fade-tab" timeout={500}>
          <TabFrame>
            <TabComponent
              uuid={uuid}
              visitor={visitor}
              setData={setGuestbookData}
            />
            <BottomButton>
              {!hasNext && (
                <MonotonicButton color="secondary" onClick={sendGuestbook}>
                  별 띄우기 💫
                </MonotonicButton>
              )}
            </BottomButton>
          </TabFrame>
        </CSSTransition>
      </TransitionGroup>
    </Root>
  );
}

export default GuestbookTabs;

const Root = styled.div`
  position: absolute;
  inset: 0 5vw 0 5vw;
  color: red;
  & > div {
    position: relative;
  }
`;
const TopButtonFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
const TabFrame = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
`;
const BottomButton = styled.div`
  margin-top: 7.5vh;
`;
