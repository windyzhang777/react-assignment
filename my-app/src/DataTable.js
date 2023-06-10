import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const MONTHS = [
  "March(Points)",
  "April(Points)",
  "May(Points)",
];

export function DataTable({
  customerData,
  getSortedPointsArr,
  sortUsers,
}) {
  const handleDataTransform = (data) => {
    const allUserIds = sortUsers(data);
    const res = [];
    for (const id of allUserIds) {
      const arr = getSortedPointsArr(id);
      res.push({ id: id, points: arr });
    }
    return res;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="right">
              Total Points
            </TableCell>
            {MONTHS.map((month, index) => (
              <TableCell align="right" key={index}>
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {handleDataTransform(customerData)?.map(
            (user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                {user?.points &&
                  user.points.map((p) => (
                    <TableCell align="right">{p}</TableCell>
                  ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
