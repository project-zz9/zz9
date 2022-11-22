import { FirestoreApi, guestbookApi } from "./base";

export const getGuestbook = async (key: string): Promise<Guestbook | null> => {
  if (!key) return null;
  return ((await guestbookApi.get<Guestbook>(key)) as Guestbook) || null;
};

export const setGuestbook = async (
  key: string,
  guestbookData: GuestbookData
): Promise<string | null> => {
  if (!key) return null;
  try {
    await guestbookApi.post(key, {
      ...guestbookData,
      timestamp: FirestoreApi.serverTime(),
    });
    return key;
  } catch {
    return null;
  }
};

export const updateGuestbook = async (key: string): Promise<string | null> => {
  if (!key) return null;
  try {
    await guestbookApi.put(key, { timestamp: FirestoreApi.serverTime() });
    return key;
  } catch {
    return null;
  }
};
