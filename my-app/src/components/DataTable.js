import {
  Box,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  TABLE1_HEADING,
  TABLE2_HEADING,
} from "../constant";
import { sortUsers } from "../helpers/commonHelpers";
import {
  getComparator,
  stableSort,
} from "../helpers/stableSort";
import { useTransactionContext } from "../hooks/useTransactionContext";

export function DataTable({ isTx, getDataByPoints }) {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { transaction } = useTransactionContext();

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const createSortHandler = useCallback(
    (property) => (event) => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  const visibleRows = useMemo(
    () =>
      stableSort(
        data,
        getComparator(order, orderBy)
      )?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [data, orderBy, page, rowsPerPage, order]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDataTransform = useCallback(
    (data) => {
      const allUserIds = sortUsers(data);
      const res = [];
      for (const id of allUserIds) {
        res.push(getDataByPoints(id));
      }
      return res;
    },
    [getDataByPoints]
  );

  const tableHeading = useMemo(
    () => (isTx ? TABLE1_HEADING : TABLE2_HEADING),
    [isTx]
  );

  const tableHeadingContent = useMemo(
    () => (
      <TableRow>
        {tableHeading?.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.align}
            padding={
              headCell.disablePadding ? "none" : "normal"
            }
            sortDirection={
              orderBy === headCell.id ? order : false
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={
                orderBy === headCell.id ? order : "asc"
              }
              onClick={createSortHandler(headCell.id)}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  gap: "3px",
                  alignItems: "center",
                }}
              >
                {headCell?.label}
                {!!headCell?.tooltip && headCell.tooltip}
              </Box>
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    ),
    [createSortHandler, order, orderBy, tableHeading]
  );

  const tableBodyContent = useMemo(
    () =>
      isTx
        ? visibleRows?.map((row, index) => (
            <TableRow
              hover
              tabIndex={-1}
              key={index}
              sx={{
                cursor: "pointer",
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row?.id}
              </TableCell>
              <TableCell align="right">
                {row?.amount}
              </TableCell>
              <TableCell align="right">
                {row?.createdat
                  .replace(/[TZ]/g, " ")
                  .trim()}
              </TableCell>
              <TableCell align="right">
                {row?.points}
              </TableCell>
            </TableRow>
          ))
        : visibleRows?.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row?.id}
              </TableCell>
              <TableCell align="right">
                {row?.total}
              </TableCell>
              <TableCell align="right">
                {row?.march}
              </TableCell>
              <TableCell align="right">
                {row?.april}
              </TableCell>
              <TableCell align="right">
                {row?.may}
              </TableCell>
            </TableRow>
          )),
    [isTx, visibleRows]
  );

  useEffect(() => {
    if (isTx) {
      setData(transaction);
    } else {
      setData(handleDataTransform(transaction));
    }
  }, [transaction, handleDataTransform, isTx]);

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length ? data?.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
