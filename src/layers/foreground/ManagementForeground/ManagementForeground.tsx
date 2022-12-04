import styled from "styled-components";
import AdminTabs from "~/components/organizations/AdminTabs";
import ArtWall from "~/components/organizations/ArtWall";
import QrScanner from "~/components/organizations/QrScanner";
import ForegroundLayer from "../ForegroundLayer";

export interface ManagementTabs {
  role: Role;
}

interface IManagementForegroundProps {
  role: Role;
}

function ManagementForeground({ role }: IManagementForegroundProps) {
  return (
    <ForegroundLayer>
      <RootFrame>
        {role === "admin" && <AdminTabs role={role} />}
        {role === "qr-scanner" && <QrScanner />}
        {role === "art-wall" && <ArtWall />}
      </RootFrame>
    </ForegroundLayer>
  );
}

export default ManagementForeground;

const RootFrame = styled.div`
  width: 95vw;
`;
