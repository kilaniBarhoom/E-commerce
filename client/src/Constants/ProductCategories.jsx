import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LaptopIcon from "@mui/icons-material/Laptop";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import HeadsetIcon from "@mui/icons-material/Headset";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import DeckIcon from "@mui/icons-material/Deck";
import SingleBedIcon from "@mui/icons-material/SingleBed";

export default function ProductCategories() {
  const productCategories = [
    {
      id: 1,
      name: "All",
      icon: "",
    },
    {
      id: 2,
      name: "Cameras",
      icon: <CameraAltIcon />,
    },
    {
      id: 3,
      name: "Laptops",
      icon: <LaptopIcon />,
    },
    {
      id: 4,
      name: "Accessories",
      icon: <EarbudsIcon />,
    },
    {
      id: 5,
      name: "Headphones",
      icon: <HeadsetIcon />,
    },
    {
      id: 6,
      name: "Food",
      icon: <FastfoodIcon />,
    },
    {
      id: 7,
      name: "Books",
      icon: <ImportContactsIcon />,
    },
    {
      id: 8,
      name: "Clothing",
      icon: <CheckroomIcon />,
    },
    {
      id: 9,
      name: "Sports",
      icon: <SportsFootballIcon />,
    },
    {
      id: 10,
      name: "Outdoors",
      icon: <DeckIcon />,
    },
    {
      id: 11,
      name: "Indoors",
      icon: <SingleBedIcon />,
    },
  ];
  return { productCategories };
}
