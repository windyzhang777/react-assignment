import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import React from "react";

const TABS = [
  "Raw Transactions & Reward Points",
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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

export default function DataTabs({
  handleTabChange,
  tab,
  table1,
  table2,
}) {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
