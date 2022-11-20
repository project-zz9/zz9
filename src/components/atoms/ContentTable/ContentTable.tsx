import {
  Table,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getKey } from "~/utils/crypto";

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
            <TableRow key={getKey(index, label, value)}>
              <LabelCell align="left">{label}</LabelCell>
              <VirtualCell />
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

const VirtualCell = styled(TableCell)({
  ...defaultCellStyle,
  padding: 10,
});

const LabelCell = styled(TableCell)({
  ...defaultCellStyle,
});
const ValueCell = styled(TableCell)({
  ...defaultCellStyle,
  fontWeight: "bold",
});
