import { MouseEvent, ChangeEvent, useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import {
  DataParserMap,
  getComparator,
  makeHeaderFromRows,
  Order,
  parseData,
  searchWithKeyword,
  stableSort,
  TableHeaderCell,
} from "./utilities";
import { getKey } from "~/utils/crypto";

interface TableData {
  id: string;
  [key: string]: any;
}

interface IEnhancedTableProps<T> {
  title: string;
  rows: T[];
  preDefinedHeader?: readonly TableHeaderCell<T>[];
  defaultOrderBy: keyof T;
  defaultOrder: Order;
  refresh?: () => void;
  onDeleteHandler?: (keys: string[], callback?: () => void) => void;
}

export default function EnhancedTable<T extends TableData>({
  title,
  rows,
  preDefinedHeader,
  defaultOrderBy,
  defaultOrder,
  onDeleteHandler,
}: IEnhancedTableProps<T>) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState<keyof T>(defaultOrderBy);
  const [selected, setSelected] = useState<T["id"][]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const header = useMemo(
    () => preDefinedHeader || makeHeaderFromRows(rows),
    [preDefinedHeader, rows]
  );

  const dataParserMap = useMemo(
    () =>
      header.reduce((accumulator, { id, dataType, getData }) => {
        if (dataType || getData) {
          accumulator[id] = {
            dataType,
            getData,
          };
        }
        return accumulator;
      }, {} as DataParserMap<T>),
    [header]
  );

  const handleSearch = (keyword: string | null) => {
    setKeyword(keyword);
  };

  const handleDelete = () => {
    if (typeof onDeleteHandler === "function") {
      onDeleteHandler(selected, () => {
        setSelected([]);
      });
    }
  };

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, id: T["id"]) => {
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

  const isSelected = (id: string) => selected.includes(id);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          onSearchHandler={handleSearch}
          onDeleteHandler={handleDelete}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              tableHeader={header}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort<T>(
                searchWithKeyword<T>(rows, keyword, dataParserMap),
                getComparator(order, orderBy)
              )
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
                      {header.map(({ id, dataType, width, getData }, index) => (
                        <TableCell
                          key={getKey(id.toString(), index)}
                          align="left"
                          width={width}
                        >
                          {parseData(
                            dataType,
                            getData ? getData(row[id]) : row[id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
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
    </Box>
  );
}
