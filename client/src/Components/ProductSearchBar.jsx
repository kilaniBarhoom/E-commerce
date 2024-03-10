import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/joy";
import * as MUI from "@mui/material";

export default function ProductSearchBar() {
  return (
    <Input
      sx={{ width: "fit-content", px: 0, pl: 1 }}
      placeholder="Search for products"
      startDecorator={<SearchIcon />}
      endDecorator={
        <MUI.Button
          variant="contained"
          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Search
        </MUI.Button>
      }
    />
  );
}
