import InfoIcon from "@mui/icons-material/Info";
import { Box, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const TABLE1_HEADING = [
  "User Id",
  "Transactions($)",
  "Created At",
  "Reward Points",
];

const TABLE2_HEADING = [
  "User Id",
  "Total Points",
  "March(Points)",
  "April(Points)",
  "May(Points)",
];

const REWARD_DISCLAIMER = `
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction.
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
`;

export function DataTable({
  customerData,
  isTx,
  getSortedPointsArr,
  sortUsers,
}) {
  // TODO: table sorting
  const [data, setData] = useState(null);

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
    () => (isTx ? TABLE1_HEADING : TABLE2_HEADING),
    [isTx]
  );

  const tableHeadingContent = useMemo(
    () => (
      <TableRow>
        {tableHeading.map((heading, index) => (
          <TableCell
            align={index === 0 ? "inherit" : "right"}
            key={index}
          >
            {heading === "Reward Points" ? (
              <Box
                sx={{
                  display: "inline-flex",
                  gap: "10px",
                }}
              >
                {heading}
                <Tooltip
                  title={REWARD_DISCLAIMER}
                  placement="top"
                >
                  <InfoIcon />
                </Tooltip>
              </Box>
            ) : (
              heading
            )}
          </TableCell>
        ))}
      </TableRow>
    ),
    [tableHeading]
  );

  const tableBodyContent = useMemo(
    () =>
      isTx
        ? data?.map((user, index) => (
            <TableRow
              key={index}
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
              <TableCell align="right">
                {user?.points}
              </TableCell>{" "}
            </TableRow>
          ))
        : handleDataTransform(data)?.map((user, index) => (
            <TableRow
              key={index}
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
    [isTx, data, handleDataTransform]
  );

  useEffect(() => {
    setData(customerData);
  }, [customerData]);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="simple table"
      >
        <TableHead>{tableHeadingContent}</TableHead>
        <TableBody>{tableBodyContent}</TableBody>
      </Table>
    </TableContainer>
  );
}
