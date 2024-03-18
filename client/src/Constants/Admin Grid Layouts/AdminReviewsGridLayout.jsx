import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton, Rating, Stack, Typography } from "@mui/material";
import moment from "moment";
import avatarColors from "../AdminSalesMenAvatarColors";
export default function AdminReviewsGridLayout() {
  const getMaxLines = (height) => {
    const lineHeight = 1.4; // Adjust this value based on your font size and line height
    return Math.floor(height / lineHeight);
  };
  const maxLines = getMaxLines(10 * 16);
  const reviewsHeaderGridRow = [
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
    }, // product preview
    {
      field: "productName",
      headerName: "Product Name",
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
            {props.value.name}
          </Typography>
          <Typography className="text-[0.70rem]  text-neutral-400 ">
            {props.value.category}
          </Typography>
        </Stack>
      ),
    }, // product name
    {
      field: "reviewer",
      headerName: "Reviewer",
      align: "left",
      width: 200,
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
    }, // person
    {
      field: "rating",
      headerName: "Rating",
      align: "left",
      width: 150,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <Rating className="" readOnly value={params.value} />
      ),
    }, // rating
    {
      field: "content",
      headerName: "Review",
      align: "left",
      width: 400,
      editable: false,
      headerAlign: "left",
      renderCell: (params) => (
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: maxLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="subtitle2"
            className="text-neutral-800 dark:text-neutral-300 break-words align-middle overflow-ellipsis"
          >
            {params.value}
          </Typography>
        </div>
      ),
    }, // content
    {
      field: "date",
      headerName: "Date Rated",
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
    }, // date rated
    {
      field: "action",
      headerName: "",
      align: "center",
      width: 100,
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
    }, // action
  ];
  return { reviewsHeaderGridRow };
}
