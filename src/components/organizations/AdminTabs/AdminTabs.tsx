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
import QrScanner from "../QrScanner";
import VisitorTable from "../VisitorTable";

type TOOLS = "/qr-scanner" | "/visitors" | "/guestbooks";

const managementTools: Record<TOOLS, { label: string; Component: FC<{}> }> = {
  "/visitors": {
    label: "사전예약자",
    Component: () => <VisitorTable />,
  },
  "/guestbooks": {
    label: "방명록",
    Component: () => <GuestbookTable />,
  },
  "/qr-scanner": {
    label: "QR 스캐너(모바일)",
    Component: () => <QrScanner />,
  },
};

function AdminTabs({ role }: ManagementTabs) {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    history.replace(`${MANAGEMENT_PATH}/${role}${tab}`);
    setTab(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (_: SyntheticEvent | null, tab: TOOLS) => {
    history.push(`${MANAGEMENT_PATH}/${role}${tab}`);
    setTab(tab);
  };
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
  background-color: red;
  margin-bottom: 1rem;
`;

const TabPanelFrame = styled.div``;
