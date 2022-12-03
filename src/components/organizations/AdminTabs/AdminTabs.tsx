import { Tab, Tabs } from "@mui/material";
import {
  FC,
  Fragment,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import type { ManagementTabs } from "~/layers/foreground/ManagementForeground";
import { MANAGEMENT_PATH } from "~/pages";
import GuestbookTable from "../GuestbookTable";
import VisitorTable from "../VisitorTable";

type TOOLS = "/visitors" | "/guestbooks";

const managementTools: Record<TOOLS, { label: string; Component: FC<{}> }> = {
  "/visitors": {
    label: "사전예약자",
    Component: () => <VisitorTable />,
  },
  "/guestbooks": {
    label: "방명록",
    Component: () => <GuestbookTable />,
  },
};

function AdminTabs({ role }: ManagementTabs) {
  const location = useLocation();
  const history = useHistory();

  const tools = useMemo(
    () =>
      Object.entries(managementTools).map(
        ([path, { label }]) =>
          ({
            path,
            label,
          } as { path: TOOLS; label: string })
      ),
    []
  );

  const [tab, setTab] = useState<TOOLS>(tools[0].path);

  const handleChange = (_: SyntheticEvent | null, tab: TOOLS) => {
    setTab(tab);
  };

  useEffect(() => {
    history.replace(`${MANAGEMENT_PATH}/${role}${tab}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const tool = useMemo(() => {
    const paths = location.pathname.split(role);
    return paths.length === 2 ? managementTools[paths[1] as TOOLS] : null;
  }, [location, role]);

  return (
    <Fragment>
      <TabFrame>
        <Tabs value={tab} onChange={handleChange}>
          {tools.map(({ path, label }) => (
            <Tab key={path} label={label} value={path} />
          ))}
        </Tabs>
      </TabFrame>
      <TabPanelFrame>
        <div>{tool && <tool.Component />}</div>
      </TabPanelFrame>
    </Fragment>
  );
}

export default AdminTabs;

const TabFrame = styled.div`
  margin-bottom: 1rem;
`;

const TabPanelFrame = styled.div``;
