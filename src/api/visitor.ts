import { scheduleCollection, visitorCollection } from "~/app/collections";
import type { VisitorData } from "~/app/jsonSchema";
import { hashing } from "~/utils/crypto";

export const getVisitor = async (
  visitor: string
): Promise<VisitorData | null> => {
  try {
    const visitorData = (
      await visitorCollection.doc(visitor).get()
    ).data() as VisitorData;
    return visitorData;
  } catch (error: any) {
    return null;
  }
};
export const setVisitor = async (
  visitorData: VisitorData
): Promise<string | null> => {
  const { name, phoneNumber, visitTime, relationship } = visitorData;
  if (!name || !phoneNumber || !visitTime || !relationship) return null;
  const visitor = hashing(`${name}::${phoneNumber}`);
  try {
    await Promise.all([
      visitorCollection.doc(visitor).set(visitorData),
      setTimeTable(visitor, visitTime),
    ]);
    return visitor;
  } catch (error: any) {
    return null;
  }
};

const setTimeTable = async (visitor: string, timestamp: string) => {
  const [date, time] = timestamp.split(" ");
  scheduleCollection.doc(visitor).set({
    date,
    time,
  });
};

type DateTime = {
  date: string;
  time: string;
};

export const getTimeTable = async (date: string): Promise<DateTime[]> => {
  try {
    const schedule: DateTime[] = [];
    (await scheduleCollection.where("date", "==", date).get()).forEach(
      (document) => {
        schedule.push(document.data() as DateTime);
      }
    );
    return schedule;
  } catch (error: any) {
    return [];
  }
};
