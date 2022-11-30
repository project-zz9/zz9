import { useEffect, useState } from "react";
import { getGuestbook, getGuestbooks } from "~/api/guestbook";
import { getTimeTable, getVisitor, getVisitors } from "~/api/visitor";

type QueryType = {
  collection: "visitor" | "schedule" | "guestbook";
};

export function useQuery<T>(
  type: QueryType,
  parameter: any,
  tick?: number
): T | Nullish {
  const { collection } = type;
  const [data, setData] = useState<T | Nullish>(undefined);
  useEffect(() => {
    parameter &&
      resolveQuery(collection, parameter).then((result) => {
        setData(result as T);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter, tick]);

  return data;
}

const resolveQuery = async (
  collection: QueryType["collection"],
  parameter: any
) => {
  switch (collection) {
    case "visitor": {
      if (parameter === "all") {
        return await getVisitors();
      } else {
        return await getVisitor(parameter as Parameters<typeof getVisitor>[0]);
      }
    }
    case "schedule": {
      return await getTimeTable(
        parameter as Parameters<typeof getTimeTable>[0]
      );
    }
    case "guestbook": {
      if (parameter === "all") {
        return await getGuestbooks();
      }
      return await getGuestbook(
        parameter as Parameters<typeof getGuestbook>[0]
      );
    }
  }
};
