// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { useMemo } from "react";
// import { getKey } from "~/utils/crypto";

// interface IDataTableProps {
//   data: Record<string, any>[];
//   columns?: Column[];
//   refresh: () => void;
//   sort?: `${string}_ASC` | `${string}_DESC`;
// }

// type Column = { label: string; key: string; width?: number; type?: "date" };

// function DataTable({
//   data,
//   columns: preDefinedColumn,
//   refresh,
//   sort,
// }: IDataTableProps) {
//   const rows = useMemo(() => {
//     if (!sort) {
//       return data;
//     }
//     const [field, order] = sort.split("_");
//     return data.sort((prev, next) =>
//       order === "ASC" ? prev[field] - next[field] : next[field] - prev[field]
//     );
//   }, [data, sort]);

//   const columns: Column[] = useMemo(
//     () =>
//       preDefinedColumn ||
//       [
//         ...data.reduce((accumulator: Set<string>, item) => {
//           Object.keys(item).forEach((key) => {
//             accumulator.add(key);
//           });
//           return accumulator;
//         }, new Set<string>()),
//       ].map((key) => ({ label: key, key })),
//     [data, preDefinedColumn]
//   );

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             {columns.map(({ label, key, width }) => (
//               <TableCell key={key} width={width}>
//                 {label}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => (
//             <TableRow
//               key={getKey(row[columns[0].key], index)}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               {columns.map(({ key, width }, i) => (
//                 <TableCell
//                   key={getKey(key, i)}
//                   component="th"
//                   scope="row"
//                   width={width}
//                 >
//                   {row[key]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default DataTable;

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { Checkbox, Paper } from "@mui/material";
import EnhancedTableHead, { TableHeaderCell } from "./EnhancedTableHead";
import { getComparator, Order, stableSort } from "./utilities";
import { getKey } from "~/utils/crypto";

interface TableData {
  id: string;
  [key: string]: any;
}

interface IEnhancedTableProps<T> {
  rows: T[];
  preDefinedHeader: readonly TableHeaderCell<T>[];
  defaultOrderBy: keyof T;
  defaultOrder: Order;
  refresh?: () => void;
}

export default function EnhancedTable<T extends TableData>({
  rows,
  preDefinedHeader,
  defaultOrderBy,
  defaultOrder,
  refresh,
}: IEnhancedTableProps<T>) {
  const [order, setOrder] = React.useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = React.useState<keyof T>(defaultOrderBy);
  const [selected, setSelected] = React.useState<T["id"][]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: T["id"]) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: T["id"][] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.includes(id);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              tableHeader={preDefinedHeader}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort<T>(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={JSON.stringify(row)}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row[preDefinedHeader[0].id]}
                      </TableCell>
                      {preDefinedHeader.slice(1).map(({ id }, index) => (
                        <TableCell
                          key={getKey(id.toString(), index)}
                          align="left"
                        >
                          {row[id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
