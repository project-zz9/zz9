import { FirestoreApi, scheduleApi, visitorApi } from "./base";
import { getKey, hashing } from "~/utils/crypto";

export const getVisitor = async (
  key: VisitorData | string
): Promise<VisitorData | null> => {
  const visitor =
    typeof key === "string"
      ? key
      : key.phoneNumber
      ? hashing(getKey(key.phoneNumber, process.env.REACT_APP_SALT))
      : null;

  return (visitor && (await visitorApi.get<VisitorData>(visitor))) || null;
};

export const setVisitor = async (
  visitorData: VisitorData
): Promise<string | null> => {
  const { name, phoneNumber, visitTime, relationship } = visitorData;
  if (!name || !phoneNumber || !visitTime || !relationship) return null;
  const visitor = hashing(getKey(phoneNumber, process.env.REACT_APP_SALT));
  try {
    await Promise.all([
      visitorApi.post(visitor, visitorData),
      setTimeTable(visitor, visitTime),
    ]);
    return visitor;
  } catch {
    return null;
  }
};

export const updateVisitorVisited = async (
  key: string
): Promise<string | null> => {
  try {
    await visitorApi.put(key, { visited: FirestoreApi.serverTime() });
    return key;
  } catch {
    return null;
  }
};

const setTimeTable = async (visitor: string, timestamp: string) => {
  const [date, time] = timestamp.split(" ");
  scheduleApi.post(visitor, {
    date,
    time,
  });
};

export const getTimeTable = async (date: string): Promise<DateTime[]> => {
  try {
    return await scheduleApi.get<DateTime[]>(["date", "==", date]);
  } catch {
    return [];
  }
};
