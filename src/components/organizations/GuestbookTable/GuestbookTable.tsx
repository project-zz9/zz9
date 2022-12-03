import { useCallback, useState } from "react";
import DataTable from "~/components/molecules/DataTable";
import { useQuery } from "~/hooks/useQuery";

// interface Data {
//   id: string;
//   calories: number;
//   carbs: number;
//   fat: number;
//   name: string;
//   protein: number;
// }

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ): Data {
//   return {
//     id: name,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

// const headCells: readonly TableHeaderCell<Data>[] = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "Dessert (100g serving)",
//   },
//   {
//     id: "calories",
//     numeric: true,
//     disablePadding: false,
//     label: "Calories",
//   },
//   {
//     id: "fat",
//     numeric: true,
//     disablePadding: false,
//     label: "Fat (g)",
//   },
//   {
//     id: "carbs",
//     numeric: true,
//     disablePadding: false,
//     label: "Carbs (g)",
//   },
//   {
//     id: "protein",
//     numeric: true,
//     disablePadding: false,
//     label: "Protein (g)",
//   },
// ];

function GuestbookTable() {
  const [tick, setTick] = useState<number>(0);
  const refresh = useCallback(() => setTick(Math.random()), []);
  const guestbooks = useQuery<Guestbook[]>(
    { collection: "guestbook" },
    "all",
    tick
  );
  console.log(guestbooks);
  return (
    <div>
      {guestbooks && (
        <DataTable
          rows={guestbooks}
          preDefinedHeader={[
            {
              id: "displayName",
              disablePadding: false,
              label: "작성자",
              width: 200,
            },
            {
              id: "timestamp",
              disablePadding: false,
              label: "등록시간",
              width: 200,
              dataType: "date",
            },
            {
              id: "message",
              disablePadding: false,
              label: "방명록",
              dataType: "multi-line",
            },
          ]}
          defaultOrder="desc"
          defaultOrderBy={"timestamp"}
          refresh={refresh}
        />
      )}
    </div>
  );
}

export default GuestbookTable;
