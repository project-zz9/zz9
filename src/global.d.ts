type DateTime = {
  date: string;
  time: string;
};

type FetchedData = {
  id: string;
};

type VisitorData = {
  name?: string;
  phoneNumber?: string;
  visitTime?: string;
  relationship?: string;
};

type Visitor = FetchedData & VisitorData & { visited?: number };

type GuestbookData = {
  displayName?: string;
  message?: string;
};

type Guestbook = FetchedData & GuestbookData & { timestamp: number };

type Role = "admin" | "manager";

type EmphasisTextForm = {
  type?: "common" | "emphasis";
  value: string;
}[];

type ColorCode = `#${string}`;

type Nullish = null | undefined;

type SetState<T> = (data: T | ((prev: T) => T)) => void;
