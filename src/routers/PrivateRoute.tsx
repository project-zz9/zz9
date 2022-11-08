import { useAtom } from "jotai";
import { ReactElement } from "react";
import { Redirect, RouteProps } from "react-router-dom";
import { SIGNIN_PATH } from "~/pages";
import { authAtom } from "~/stores/auth";

type ProtectedRouteProp = {
  redirectPath?: string;
};

function ProtectedRoute({
  redirectPath = SIGNIN_PATH,
  children,
}: RouteProps & ProtectedRouteProp): ReactElement | null {
  const [user] = useAtom(authAtom);
  return user ? (children as ReactElement) : <Redirect to={redirectPath} />;
}

export { ProtectedRoute };
