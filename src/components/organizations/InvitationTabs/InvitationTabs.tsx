import { FC, useMemo } from "react";
import InvitationCard from "~/components/molecules/InvitationCard";
import InvitationPortal from "~/components/molecules/InvitationPortal";

interface IInvitationTabsProps {
  visitor: VisitorData;
  tab: string;
  tabNavigate?: (tab: string) => void;
}

export interface ITabProps {
  visitor: VisitorData;
  tabNavigate?: (tab: string) => void;
}

const tabs: Record<string, FC<ITabProps>> = {
  portal: InvitationPortal,
  card: InvitationCard,
};

function InvitationTabs({ tab, visitor, tabNavigate }: IInvitationTabsProps) {
  const Tab = useMemo(() => tabs[tab] || null, [tab]);
  return Tab && <Tab visitor={visitor} tabNavigate={tabNavigate} />;
}

export default InvitationTabs;
