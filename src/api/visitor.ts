import { scheduleApi, visitorApi } from "./base";
import { hashing } from "~/utils/crypto";
import { SEPARATOR } from "~/app/constant";

export const getVisitor = async (
  key: VisitorData | string
): Promise<VisitorData | null> => {
  const visitor =
    typeof key === "string"
      ? key
      : key.name && key.phoneNumber
      ? hashing(`${key.name}${SEPARATOR}${key.phoneNumber}`)
      : null;

  return visitor
    ? ((await visitorApi.get<VisitorData>(visitor)) as VisitorData)
    : null;
};
export const setVisitor = async (
  visitorData: VisitorData
): Promise<string | null> => {
  const { name, phoneNumber, visitTime, relationship } = visitorData;
  if (!name || !phoneNumber || !visitTime || !relationship) return null;
  const visitor = hashing(`${name}${SEPARATOR}${phoneNumber}`);
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
