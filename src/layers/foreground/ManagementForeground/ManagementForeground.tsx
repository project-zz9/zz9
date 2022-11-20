import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import QrScanner from "~/components/molecules/QrScanner";
import { MANAGEMENT_PATH } from "~/pages";
import { getKey } from "~/utils/crypto";
import ForegroundLayer from "../ForegroundLayer";

const managementTools: Record<string, any> = {
  "/qr-scanner": {
    title: "",
    Component: () => <QrScanner />,
  },
};

function ManagementForeground() {
  const location = useLocation();

  const tools = useMemo(() => Object.keys(managementTools), []);
  const tool = useMemo(() => {
    const paths = location.pathname.split(MANAGEMENT_PATH);
    return paths.length === 2 ? managementTools[paths[1]] : null;
  }, [location]);

  return (
    <ForegroundLayer>
      {location.pathname.endsWith(MANAGEMENT_PATH) ? (
        <div>
          {tools.map((path) => (
            <Link key={getKey(path)} to={`${location.pathname}${path}`}>
              {path}
            </Link>
          ))}
        </div>
      ) : (
        <div>{tool && <tool.Component />}</div>
      )}
    </ForegroundLayer>
  );
}

export default ManagementForeground;
