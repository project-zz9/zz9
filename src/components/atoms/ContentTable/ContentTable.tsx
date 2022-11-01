import {
  Table,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface IContentTableProps {
  contents: {
    label: string;
    value: string;
  }[];
}

function ContentTable({ contents }: IContentTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {contents.map(({ label, value }, index) => (
            <TableRow key={`${index}::${label}::${value}`}>
              <LabelCell align="left">{label}</LabelCell>
              <ValueCell align="left">{value}</ValueCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ContentTable;

const defaultCellStyle = {
  padding: 0,
  fontSize: "1.05rem",
  border: "none",
};

const LabelCell = styled(TableCell)({
  ...defaultCellStyle,
  width: "20vw",
});
const ValueCell = styled(TableCell)({
  ...defaultCellStyle,
  fontWeight: "bold",
});
