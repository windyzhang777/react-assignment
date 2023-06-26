import { Alert, Box, LinearProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DataChart } from "./components/DataChart";
import { DataTabs } from "./components/DataTabs";
import { useGetTransaction } from "./hooks/useGetTransaction";
import { useTransactionContext } from "./hooks/useTransactionContext";

export default function App() {
  const [tab, setTab] = useState(0);
  const { isLoading, error, getTransaction } =
    useGetTransaction();
  const { transaction } = useTransactionContext();

  useEffect(() => {
    getTransaction();
  }, [getTransaction]);

  const getDataByPoints = useCallback(
    (userId) => {
      const userData = transaction?.filter(
        (d) => d.id === userId
      );
      const monthMap = { march: 0, april: 0, may: 0 };
      const total = userData?.reduce((acc, cur) => {
        const month = new Date(cur.createdat)
          .toLocaleString("en-US", { month: "long" })
          .toLocaleLowerCase();
        if (!monthMap[month]) {
          monthMap[month] = cur.points;
        } else {
          monthMap[month] += cur.points;
        }
        acc += cur.points;
        return acc;
      }, 0);
      return {
        id: userId,
        total,
        ...monthMap,
      };
    },
    [transaction]
  );

  const handleTabChange = (e, tab) => {
    setTab(tab);
  };

  return isLoading || !transaction ? (
    <LinearProgress />
  ) : (
    <Box m={1} sx={{ maxWidth: "800px" }}>
      {error && <Alert severity="error">{error}</Alert>}
      <DataChart getDataByPoints={getDataByPoints} />
      <DataTabs
        getDataByPoints={getDataByPoints}
        handleTabChange={handleTabChange}
        tab={tab}
      />
    </Box>
  );
}
