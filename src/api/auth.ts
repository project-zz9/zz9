import { authApi } from "./base";

export const checkAuthorize = async (key: string): Promise<Role | null> => {
  if (!key) return null;
  return (
    ((await authApi.get<{ role: Role }>(key)) as { role: Role })?.role || null
  );
};
