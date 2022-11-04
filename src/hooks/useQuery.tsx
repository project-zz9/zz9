import { useEffect, useState } from "react";
import { getTimeTable, getVisitor, setVisitor } from "~/api/visitor";

type QueryType = {
  collection: "visitor" | "schedule" | "guestbook";
  method: "get" | "set";
};

export function useQuery(type: QueryType, parameter: any) {
  const { collection, method } = type;
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    parameter &&
      resolveQuery(collection, method, parameter).then((result) => {
        setData(result);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter]);

  return data;
}

const resolveQuery = async (
  collection: QueryType["collection"],
  method: QueryType["method"],
  parameter: any
) => {
  switch (collection) {
    case "visitor": {
      if (method === "get") {
        return await getVisitor(parameter as Parameters<typeof getVisitor>[0]);
      }
      if (method === "set") {
        return await setVisitor(parameter as Parameters<typeof getVisitor>[0]);
      }
      break;
    }
    case "schedule": {
      if (method === "get") {
        return await getTimeTable(
          parameter as Parameters<typeof getTimeTable>[0]
        );
      }
      break;
    }
    case "guestbook": {
      if (method === "get") {
      }
      if (method === "set") {
      }
      break;
    }
  }
};
