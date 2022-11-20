import { scheduleApi, visitorApi } from "./base";
import { getKey, hashing } from "~/utils/crypto";

export const getVisitor = async (
  key: VisitorData | string
): Promise<VisitorData | null> => {
  const visitor =
    typeof key === "string"
      ? key
      : key.phoneNumber
      ? hashing(getKey(key.phoneNumber))
      : null;

  return (
    (visitor &&
      ((await visitorApi.get<VisitorData>(visitor)) as VisitorData)) ||
    null
  );
};
export const setVisitor = async (
  visitorData: VisitorData
): Promise<string | null> => {
  const { name, phoneNumber, visitTime, relationship } = visitorData;
  if (!name || !phoneNumber || !visitTime || !relationship) return null;
  const visitor = hashing(getKey(phoneNumber));
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
