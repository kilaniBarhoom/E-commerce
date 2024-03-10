import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip } from "@mui/joy";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import moment from "moment";
import ReactCountryFlag from "react-country-flag";
import avatarColors from "../AdminSalesMenAvatarColors.js";
import countryNameToCode from "../ContryCodes.js";

export default function AdminSalesMenGridLayout() {
  const salesMenHeaderGridRow = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: "70",
      editable: false,
      align: "left",
      renderCell: (params) => (
        <Avatar
          src={params.value}
          sx={{
            bgcolor:
              avatarColors[Math.floor(Math.random() * avatarColors.length)],
          }}
          alt="product preview"
          width={50}
          height={50}
        >
          {params.value ? "" : params.row.name[0]}
        </Avatar>
      ),
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Name",
      align: "left",
      width: 140,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          variant="h6"
          className="text-lg text-neutral-800 dark:text-neutral-300"
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      align: "left",
      width: 200,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          onClick={() => window.location.assign(`mailto:${params.value}`)}
          variant="subtitle1"
          className="dark:hover:text-blue-500 dark:text-neutral-400 cursor-pointer underline"
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "country",
      headerName: "Country",
      align: "left",
      width: 200,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <ReactCountryFlag
            className="emojiFlag"
            countryCode={countryNameToCode[params.value]}
            style={{
              fontSize: "2em",
            }}
            title={params.value}
            svg
          />
          <Typography
            variant="h6"
            className="text-lg text-neutral-800 dark:text-neutral-300"
          >
            {params.value}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      align: "left",
      width: 150,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Chip
          size="md"
          variant="solid"
          color={
            params.value === "Admin"
              ? "primary"
              : params.value === "Sales Man"
              ? "success"
              : "error"
          }
        >
          {params.value}
        </Chip>
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
            params.value === "Active"
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
      field: "dateJoined",
      headerName: "Date Joined",
      align: "left",
      width: 172,
      editable: false,
      sortable: true,
      filterable: true,
      headerAlign: "left",
      renderCell: (params) => (
        <Typography
          variant="h6"
          className="text-lg text-neutral-800 dark:text-neutral-300 underline cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"
        >
          {moment(params.value).format("MMM Do YY")}
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
  return { salesMenHeaderGridRow };
}
