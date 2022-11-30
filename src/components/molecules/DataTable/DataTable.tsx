import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";
import { getKey } from "~/utils/crypto";

interface IDataTableProps {
  data: Record<string, any>[];
  columns?: { label: string; key: string; type?: "date" }[];
  refresh: () => void;
}

function DataTable({
  data,
  columns: preDefinedColumn,
  refresh,
}: IDataTableProps) {
  const columns = useMemo(
    () =>
      preDefinedColumn ||
      [
        ...data.reduce((accumulator: Set<string>, item) => {
          Object.keys(item).forEach((key) => {
            accumulator.add(key);
          });
          return accumulator;
        }, new Set<string>()),
      ].map((key) => ({ label: key, key })),
    [data, preDefinedColumn]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ label, key }) => (
              <TableCell key={key}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={getKey(row[columns[0].key], index)}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map(({ key }, i) => (
                <TableCell key={getKey(key, i)} component="th" scope="row">
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
