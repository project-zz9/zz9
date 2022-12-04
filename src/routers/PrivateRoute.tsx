import { useAtom } from "jotai";
import { ReactElement } from "react";
import { Redirect, RouteProps } from "react-router-dom";
import { SIGNIN_PATH } from "~/pages";
import { roleAtom } from "~/stores/role";

type ProtectedRouteProp = {
  redirectPath?: string;
};

function ProtectedRoute({
  redirectPath = SIGNIN_PATH,
  children,
}: RouteProps & ProtectedRouteProp): ReactElement | null {
  const [role] = useAtom(roleAtom);
  return role ? (children as ReactElement) : <Redirect to={redirectPath} />;
}

export { ProtectedRoute };
