import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import avatarColors from "../AdminSalesMenAvatarColors.js";

export default function AdminOrdersGridLayout() {
  const ordersHeaderGridRow = [
    {
      field: "id",
      headerName: "Order",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography
          variant="body1"
          className="text-lg text-neutral-800 dark:text-neutral-300 font-semibold"
        >
          #{params.value}
        </Typography>
      ),
    },
    {
      field: "customer",
      headerName: "Customer",
      align: "left",
      width: 250,
      editable: false,
      renderCell: (params) => (
        <Stack direction="row" gap={1} className="items-center">
          <Avatar
            src={params.value.avatar}
            sx={{
              bgcolor:
                avatarColors[Math.floor(Math.random() * avatarColors.length)],
            }}
            alt="salesman"
            width={50}
            height={50}
          >
            {params.value.avatar ? "" : params.value.name[0]}
          </Avatar>
          <Stack gap={0}>
            <Typography
              variant="h6"
              className="text-lg text-neutral-800 dark:text-neutral-300"
            >
              {params.value.name}
            </Typography>
            <Typography className="text-[0.80rem]  text-neutral-400 ">
              {params.value.email}
            </Typography>
          </Stack>
        </Stack>
      ),
      headerAlign: "left",
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      align: "left",
      width: 172,
      editable: false,
      sortable: true,
      filterable: true,
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          variant="h6"
          className="text-lg text-neutral-800 dark:text-neutral-300 "
        >
          {moment(params.value).format("MMM Do YY")}
        </Typography>
      ),
    },
    {
      field: "orderAmount",
      headerName: "Order Amount",
      align: "left",
      width: 150,
      editable: false,
      type: "number",
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          variant="h6"
          className="text-lg text-neutral-800 dark:text-neutral-300"
        >
          ${params.value}
        </Typography>
      ),
    },
    {
      field: "items",
      headerName: "Items",
      align: "center",
      width: 110,
      editable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          variant="h6"
          className="text-lg text-neutral-800 dark:text-neutral-300"
        >
          ${params.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      align: "left",
      width: 110,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          variant="subtitle2"
          className={`${
            params.value === "Delivered"
              ? "bg-green-500 text-white"
              : params.value === "Pending"
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          } px-2 py-1 rounded-md`}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "acions",
      headerName: "Actions",
      align: "center",
      width: 140,
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <IconButton
          className="text-neutral-600 dark:text-neutral-200"
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
      ),
      headerAlign: "center",
    },
  ];
  return { ordersHeaderGridRow };
}
