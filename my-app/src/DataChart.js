import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

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

export function DataChart({
  customerData,
  getSortedPointsArr,
  sortUsers,
}) {
  const handleDataTransform = (data) => {
    const allUserIds = sortUsers(data);
    const res = [];
    for (const id of allUserIds) {
      const arr = getSortedPointsArr(id);
      for (let i = 0; i < arr.length; i++) {
        if (!res[i]) {
          res[i] = [];
        } else {
          res[i].push(arr[i]);
        }
      }
    }
    return res;
  };

  const data = {
    labels: sortUsers(customerData),
    datasets: [
      {
        label: "March",
        data: handleDataTransform(customerData)[1],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "April",
        data: handleDataTransform(customerData)[2],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "May",
        data: handleDataTransform(customerData)[3],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
