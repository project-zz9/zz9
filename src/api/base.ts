import {
  CollectionReference,
  timestamp,
  firestore,
  GUESTBOOK_COLLECTION,
  SCHEDULE_COLLECTION,
  VISITOR_COLLECTION,
  WhereFilterOp,
  AUTH_COLLECTION,
} from "~/app/firesore";

export class FirestoreApi {
  private collection: CollectionReference;
  constructor(collection: string) {
    this.collection = firestore.collection(collection);
  }
  static serverTime(): number {
    return timestamp.now().seconds;
  }

  async get<T>(query: string | [string, WhereFilterOp, string]): Promise<T> {
    if (isWhereFilter(query)) {
      const [field, operator, value] = query;
      const data: any[] = [];
      try {
        (await this.collection.where(field, operator, value).get()).forEach(
          (document) => {
            data.push(document.data());
          }
        );
        return data as T;
      } catch (error: any) {
        throw new Error(error);
      }
    }
    try {
      return (await this.collection.doc(query).get()).data() as T;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async post(key: string, value: any): Promise<void> {
    try {
      await this.collection.doc(key).set(value);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async put(key: string, value: any): Promise<void> {
    try {
      await this.collection.doc(key).set(value, { merge: true });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const visitorApi = new FirestoreApi(VISITOR_COLLECTION);
export const scheduleApi = new FirestoreApi(SCHEDULE_COLLECTION);
export const guestbookApi = new FirestoreApi(GUESTBOOK_COLLECTION);
export const authApi = new FirestoreApi(AUTH_COLLECTION);

function isWhereFilter(
  query: [string, WhereFilterOp, string] | string
): query is [string, WhereFilterOp, string] {
  return Array.isArray(query) && typeof query !== "string";
}
