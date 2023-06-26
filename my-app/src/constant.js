import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

export const REWARD_DISCLAIMER = `
A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction.
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
`;

export const TABLE1_HEADING = [
  {
    id: "id",
    align: "left",
    disablePadding: true,
    label: "User Id",
  },
  {
    id: "amount",
    align: "right",
    disablePadding: true,
    label: "Transaction Amount($)",
  },
  {
    id: "createdat",
    align: "right",
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "points",
    align: "right",
    disablePadding: true,
    label: "Reward Points",
    tooltip: (
      <Tooltip
        sx={{ height: "18px", width: "18px" }}
        title={REWARD_DISCLAIMER}
        placement="top"
      >
        <InfoIcon />
      </Tooltip>
    ),
  },
];

export const TABLE2_HEADING = [
  {
    id: "id",
    align: "left",
    disablePadding: true,
    label: "User Id",
  },
  {
    id: "total",
    align: "right",
    disablePadding: true,
    label: "Total Points",
  },
  {
    id: "march",
    align: "right",
    disablePadding: true,
    label: "March(Points)",
  },
  {
    id: "april",
    align: "right",
    disablePadding: true,
    label: "April(Points)",
  },
  {
    id: "may",
    align: "right",
    disablePadding: true,
    label: "May(Points)",
  },
];
