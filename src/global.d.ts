type DateTime = {
  date: string;
  time: string;
};

type VisitorData = {
  name?: string;
  phoneNumber?: string;
  visitTime?: string;
  relationship?: string;
};

type EmphasisTextForm = {
  type?: "common" | "emphasis";
  value: string;
}[];

type ColorCode = `#${string}`;
