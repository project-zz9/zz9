import { scheduleApi, visitorApi } from "./base";
import { hashing } from "~/utils/crypto";

export const getVisitor = async (
  visitorData: VisitorData
): Promise<VisitorData | null> => {
  const { name, phoneNumber } = visitorData;
  if (!name || !phoneNumber) return null;
  const visitor = hashing(`${name}::${phoneNumber}`);
  return (await visitorApi.get<VisitorData>(visitor)) as VisitorData;
};
export const setVisitor = async (
  visitorData: VisitorData
): Promise<string | null> => {
  const { name, phoneNumber, visitTime, relationship } = visitorData;
  if (!name || !phoneNumber || !visitTime || !relationship) return null;
  const visitor = hashing(`${name}::${phoneNumber}`);
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
