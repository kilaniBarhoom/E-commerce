import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
} from "@mui/joy";
import { Avatar, Rating, Stack, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import avatarColors from "../AdminSalesMenAvatarColors";
export default function AdminProductsGridLayout() {
  const nav = useNavigate();
  const productsHeaderGridRow = [
    {
      field: "preview",
      headerName: "Preview",
      width: 100,
      editable: false,
      align: "left",
      renderCell: (params) => (
        <img
          src={params.value}
          alt="product preview"
          width={60}
          style={{
            mixBlendMode: "multiply",
            objectFit: "cover",
            // paddingTop: "5px",
            borderRadius: "10px",
          }}
        />
      ),
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Name",
      align: "left",
      width: 160,
      editable: false,
      headerAlign: "left",
      renderCell: (props) => (
        <Stack>
          <Typography
            variant="h6"
            className="text-lg text-neutral-800 dark:text-neutral-300"
          >
            {props.value}
          </Typography>
          <Typography className="text-[0.70rem]  text-neutral-400 ">
            {props.row.category}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "seller",
      headerName: "Seller",
      align: "left",
      width: 300,
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
      field: "price",
      headerName: "Price",
      align: "left",
      type: "number",
      width: 140,
      editable: false,
      renderCell: (params) => (
        <Typography
          variant="h6"
          className="text-lg text-neutral-800 dark:text-neutral-300"
        >
          ${params.value.toFixed(3)}
        </Typography>
      ),
      headerAlign: "left",
    },
    {
      field: "stock",
      headerName: "Stock",
      align: "left",
      minWidth: 150,
      type: "number",
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Tooltip
          title={`${params.value} left in stock`}
          disableInteractive
          arrow
          size="md"
        >
          <div
            onClick={() => console.log(params.value)}
            className="flex border-solid border-black border-2 flex-row relative items-center cursor-default select-none justify-center w-full h-[50%] bg-neutral-100"
          >
            <div
              className=" flex
                flex-row
                justify-center
                items-center z-10
                text-neutral-800"
            >
              {((params.value / 10000) * 100).toFixed(3)}%
            </div>
            <div
              style={{ width: `${(params.value / 10000) * 100}%` }}
              className={`absolute top-0 left-0 h-full cursor-pointer ${
                params.value >= 5000
                  ? "bg-green-500"
                  : params.value <= 5000 && params.value >= 200
                  ? "bg-orange-500"
                  : "bg-red-600"
              }`}
            ></div>
          </div>
        </Tooltip>
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
      field: "rating",
      headerName: "Rating",
      align: "left",
      width: 150,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <StyledRating className="dark-theme" readOnly value={params.value} />
      ),
    },
    {
      field: "acion",
      headerName: "Actions",
      align: "center",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            size="sm"
            slotProps={{ root: { variant: "plain" } }}
            className="dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-600 active:bg-neutral-200 dark:active:bg-neutral-500"
          >
            <MoreVertIcon />
          </MenuButton>
          <Menu placement="bottom-end">
            <MenuItem
              onClick={() => {
                nav(`/admin/products/${params.row.id}`);
              }}
            >
              <ListItemDecorator>
                <RemoveRedEyeIcon />
              </ListItemDecorator>
              View
            </MenuItem>
            <MenuItem>
              <ListItemDecorator>
                <Edit />
              </ListItemDecorator>{" "}
              Edit
            </MenuItem>
            <ListDivider />
            <MenuItem variant="soft" color="danger">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <DeleteForever />
              </ListItemDecorator>{" "}
              Delete
            </MenuItem>
          </Menu>
        </Dropdown>
      ),
      headerAlign: "center",
    },
  ];
  return { productsHeaderGridRow };
}

const isDarkMode = () => {
  // Replace 'dark' with the actual dark mode class from Tailwind CSS
  return document.documentElement.classList.contains("dark");
};

const StyledRating = styled(Rating)(() => ({
  // Add your custom styles here
  // Example for handling dark background
  color: isDarkMode() ? "#fff" : "#000",
  "& .MuiRating-iconFilled": {
    color: isDarkMode() ? "#fff" : "#f57c00", // Adjust the filled star color
  },
  "& .MuiRating-iconEmpty": {
    color: isDarkMode() ? "#616161" : "#bdbdbd", // Adjust the empty star color
  },
}));
