import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useCallback, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { sortUsers } from "../helpers/commonHelpers";
import { useTransactionContext } from "../hooks/useTransactionContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Customer Reward Points Summary",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function DataChart({ getDataByPoints }) {
  const { transaction } = useTransactionContext();

  const handleDataTransform = useCallback(
    (data) => {
      const allUserIds = sortUsers(data);
      const res = [];
      for (const id of allUserIds) {
        const arr = Object.values(
          getDataByPoints(id)
        )?.slice(1);
        for (let i = 0; i < arr.length; i++) {
          if (!res[i]) {
            res[i] = [arr[i]];
          } else {
            res[i].push(arr[i]);
          }
        }
      }
      return res;
    },
    [getDataByPoints]
  );

  const data = useMemo(() => {
    return {
      labels: sortUsers(transaction),
      datasets: [
        {
          label: "March",
          data: handleDataTransform(transaction)[1],
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "April",
          data: handleDataTransform(transaction)[2],
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "May",
          data: handleDataTransform(transaction)[3],
          backgroundColor: "rgb(53, 162, 235)",
        },
      ],
    };
  }, [transaction, handleDataTransform]);

  return <Bar options={options} data={data} />;
}
