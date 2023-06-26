import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { DataChart } from "./components/DataChart";
import { DataTabs } from "./components/DataTabs";
import { useTransactionContext } from "./hooks/useTransactionContext";

export default function App() {
  const [tab, setTab] = useState(0);
  const { transaction, dispatch } = useTransactionContext();

  useEffect(() => {
    fetch("/getTransactions", {
      method: "GET",
      header: { "Context-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const updated = data?.map((d) => ({
          ...d,
          points: calcPointsPerTx(d.amount),
        }));
        updated?.sort((a, b) => a.id < b.id);
        dispatch({ type: "GET_ALL_TX", payload: updated });
      });
  }, [dispatch]);

  const calcPointsPerTx = (tx) => {
    let points = 0;
    const txAbs = Math.floor(tx);
    if (txAbs > 50) {
      points += Math.min(txAbs, 100) - 50;
    }
    if (txAbs > 100) {
      points += (txAbs - 100) * 2;
    }
    return points;
  };

  const sortUsers = (data) => {
    const users = Array.from(
      new Set(data?.map((d) => d.id)).values()
    );
    users?.sort((a, b) => a - b);
    return users;
  };

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

  return (
    <Box m={1} sx={{ maxWidth: "800px" }}>
      <DataChart
        getDataByPoints={getDataByPoints}
        sortUsers={sortUsers}
      />
      <DataTabs
        getDataByPoints={getDataByPoints}
        handleTabChange={handleTabChange}
        sortUsers={sortUsers}
        tab={tab}
      />
    </Box>
  );
}
