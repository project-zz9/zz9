import styled from "styled-components";
import AdminTabs from "~/components/organizations/AdminTabs";
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
        {role === "manager" && <AdminTabs role={role} />}
      </RootFrame>
    </ForegroundLayer>
  );
}

export default ManagementForeground;

const RootFrame = styled.div`
  width: 95vw;
`;
