import { useCallback, useEffect, useState } from "react";
import { DataChart } from "./DataChart";
import { DataTable } from "./DataTable";
import DataTabs from "./DataTabs";

function App() {
  const [customerData, setCustomerData] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetch("/getTransactions", {
      method: "GET",
      header: { "context-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const updated = data?.map((d) => ({
          ...d,
          points: calcPointsPerTx(d.amount),
        }));
        updated.sort((a, b) => a.id < b.id);
        setCustomerData(updated);
      });
  }, []);

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
    users.sort((a, b) => a - b);
    return users;
  };

  const getSortedPointsArr = useCallback(
    (userId) => {
      const userData = customerData?.filter(
        (d) => d.id === userId
      );
      const monthMap = { 3: 0, 4: 0, 5: 0 };
      const total = userData?.reduce((acc, cur) => {
        const month =
          new Date(cur.createdat).getMonth() + 1;
        if (!monthMap[month]) {
          monthMap[month] = cur.points;
        } else {
          monthMap[month] += cur.points;
        }
        acc += cur.points;
        return acc;
      }, 0);
      return [total, ...Object.values(monthMap)];
    },
    [customerData]
  );

  const handleTabChange = (e, tab) => {
    setTab(tab);
  };

  return (
    <>
      <DataChart
        customerData={customerData}
        getSortedPointsArr={getSortedPointsArr}
        sortUsers={sortUsers}
      />
      <DataTabs
        handleTabChange={handleTabChange}
        tab={tab}
        table1={
          <DataTable
            customerData={customerData}
            isTx={true}
            getSortedPointsArr={getSortedPointsArr}
            sortUsers={sortUsers}
          />
        }
        table2={
          <DataTable
            customerData={customerData}
            isTx={false}
            getSortedPointsArr={getSortedPointsArr}
            sortUsers={sortUsers}
          />
        }
      />
    </>
  );
}

export default App;
