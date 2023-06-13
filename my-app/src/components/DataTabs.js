import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useMemo } from "react";
import { DataTable } from "./DataTable";

const TABS = [
  "Transactions & Points",
  "Reward Points by UserId",
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function DataTabs({
  customerData,
  getDataByPoints,
  handleTabChange,
  sortUsers,
  tab,
}) {
  const table1 = useMemo(
    () => (
      <DataTable
        customerData={customerData}
        isTx={true}
        getDataByPoints={getDataByPoints}
        sortUsers={sortUsers}
      />
    ),
    [customerData, getDataByPoints, sortUsers]
  );
  const table2 = useMemo(
    () => (
      <DataTable
        customerData={customerData}
        isTx={false}
        getDataByPoints={getDataByPoints}
        sortUsers={sortUsers}
      />
    ),
    [customerData, getDataByPoints, sortUsers]
  );
  return (
    <>
      <Box
        mt={4}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label={TABS[0]} {...a11yProps(0)} />
          <Tab label={TABS[1]} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        {table1}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {table2}
      </TabPanel>
    </>
  );
}
