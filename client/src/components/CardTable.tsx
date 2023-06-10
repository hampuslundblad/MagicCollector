import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Card } from "../types/Card";

type CardTableProps = {
  data: Card[];
};

const CardTable = ({ data }: CardTableProps) => {
  console.log("hej", data)
  const rows = data ?? [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price (total)</TableCell>
            <TableCell align="right">Foil </TableCell>
            <TableCell align="right">Set</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.priceTotal}</TableCell>
              <TableCell align="right">{JSON.stringify(row.foil)}</TableCell>
              <TableCell align="right">{row.set}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CardTable;
