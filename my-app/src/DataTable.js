import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCallback, useMemo } from "react";

const TABLE1HEADING = [
  "User Id",
  "Transactions($)",
  "Created At",
];

const TABLE2HEADING = [
  "User Id",
  "Total Points",
  "March(Points)",
  "April(Points)",
  "May(Points)",
];

export function DataTable({
  customerData,
  isTx,
  getSortedPointsArr,
  sortUsers,
}) {
  const handleDataTransform = useCallback(
    (data) => {
      const allUserIds = sortUsers(data);
      const res = [];
      for (const id of allUserIds) {
        const arr = getSortedPointsArr(id);
        res.push({ id: id, points: arr });
      }
      return res;
    },
    [getSortedPointsArr, sortUsers]
  );

  const tableHeading = useMemo(
    () => (isTx ? TABLE1HEADING : TABLE2HEADING),
    [isTx]
  );

  const tableBody = useMemo(
    () =>
      isTx
        ? customerData?.map((user) => (
            <TableRow
              key={user?.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {user?.id}
              </TableCell>
              <TableCell align="right">
                {user?.amount}
              </TableCell>
              <TableCell align="right">
                {user?.createdat
                  .replace(/[TZ]/g, " ")
                  .trim()}
              </TableCell>
            </TableRow>
          ))
        : handleDataTransform(customerData)?.map((user) => (
            <TableRow
              key={user?.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {user?.id}
              </TableCell>
              {user?.points?.map((p, index) => (
                <TableCell key={index} align="right">
                  {p}
                </TableCell>
              ))}
            </TableRow>
          )),
    [isTx, customerData, handleDataTransform]
  );

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {tableHeading.map((month, index) => (
              <TableCell
                align={index === 0 ? "" : "right"}
                key={index}
              >
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}
