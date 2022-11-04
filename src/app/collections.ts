import { firestore } from "./firesore";

const VISITOR = "visitor";
const GUESTBOOK = "guestbook";
const SCHEDULE = "schedule";

export const visitorCollection = firestore.collection(VISITOR);
export const scheduleCollection = firestore.collection(SCHEDULE);
export const guestbookCollection = firestore.collection(GUESTBOOK);
