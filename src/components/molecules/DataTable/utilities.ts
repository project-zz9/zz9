import dayjs from "dayjs/esm";
export type Order = "asc" | "desc";
export interface TableHeaderCell<T> {
  id: keyof T;
  label: string;
  disablePadding: boolean;
  dataType?: "date" | "number" | "string" | "multi-line";
  getData?: (data: any) => string;
  width?: number;
}

export const makeHeaderFromRows = <T extends Object>(
  rows: T[]
): TableHeaderCell<T>[] => {
  return [
    ...rows.reduce((accumulator: Set<string>, item) => {
      Object.keys(item).forEach((key) => {
        accumulator.add(key);
      });
      return accumulator;
    }, new Set<string>()),
  ].map(
    (id) =>
      ({
        id,
        label: id,
        disablePadding: false,
      } as TableHeaderCell<T>)
  );
};

export const parseData = (
  type: TableHeaderCell<any>["dataType"],
  data: any
) => {
  switch (type) {
    case "date": {
      return dayjs(data).format("YYYY-MM-DD HH:mm");
    }
    case "number": {
      return data?.toLocaleString("ko-KR");
    }
    case "multi-line": {
      return data;
    }
  }
  return data;
};

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
