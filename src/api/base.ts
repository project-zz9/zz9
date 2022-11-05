import {
  CollectionReference,
  timestamp,
  firestore,
  GUESTBOOK_COLLECTION,
  SCHEDULE_COLLECTION,
  VISITOR_COLLECTION,
  WhereFilterOp,
} from "~/app/firesore";

export class FirestoreApi {
  private collection: CollectionReference;
  constructor(collection: string) {
    this.collection = firestore.collection(collection);
  }
  static serverTime(): number {
    return timestamp.now().seconds;
  }

  async get<T>({
    id,
    query,
  }: {
    id?: string;
    query?: [string, WhereFilterOp, string];
  }): Promise<T | null> {
    if (id) {
      try {
        return (await this.collection.doc(id).get()).data() as T;
      } catch (error: any) {
        throw new Error(error);
      }
    }
    if (query) {
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
    return null;
  }

  async post(key: string, value: any): Promise<void> {
    try {
      await this.collection.doc(key).set(value);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export const visitorApi = new FirestoreApi(VISITOR_COLLECTION);
export const scheduleApi = new FirestoreApi(SCHEDULE_COLLECTION);
export const guestbookApi = new FirestoreApi(GUESTBOOK_COLLECTION);
