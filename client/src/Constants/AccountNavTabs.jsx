import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
// import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export default function AccountNavTabs() {
  const accountNavTabs = [
    {
      id: 1,
      name: "Personal",
      icon: <TrendingDownOutlinedIcon />,
    },
    {
      id: 2,
      name: "Payment Info",
      icon: <ProductionQuantityLimitsIcon />,
    },
    {
      id: 3,
      name: "Security",
      icon: <InsertEmoticonOutlinedIcon />,
    },
    {
      id: 4,
      name: "Apply",
      icon: <GradeOutlinedIcon />,
    },
  ];
  return { accountNavTabs };
}
