import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export default function AdminNavTabs() {
  const adminNavTabs = [
    {
      id: 1,
      name: "Main Info",
      icon: <TrendingDownOutlinedIcon />,
    },
    {
      id: 2,
      name: "Products",
      icon: <ProductionQuantityLimitsIcon />,
    },
    {
      id: 3,
      name: "SalesMen",
      icon: <GroupsOutlinedIcon />,
    },
    {
      id: 4,
      name: "Customers",
      icon: <InsertEmoticonOutlinedIcon />,
    },
    {
      id: 5,
      name: "Orders",
      icon: <LocalMallOutlinedIcon />,
    },
    {
      id: 6,
      name: "Reviews",
      icon: <GradeOutlinedIcon />,
    },
  ];
  return { adminNavTabs };
}
