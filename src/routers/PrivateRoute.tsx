import { useAtom } from "jotai";
import { ReactElement } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { SIGNIN_PATH } from "~/pages";
import { authAtom } from "~/stores/auth";

type ProtectedRouteProp = {
  redirectPath?: string;
};

function ProtectedRoute({
  redirectPath = SIGNIN_PATH,
  element,
}: RouteProps & ProtectedRouteProp): ReactElement | null {
  const [user] = useAtom(authAtom);
  return user ? (
    (element as ReactElement)
  ) : (
    <Navigate to={redirectPath} replace />
  );
}

export { ProtectedRoute };
