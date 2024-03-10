import * as MUI from "@mui/material";
import AdminSalesMenGridLayout from "../../Constants/Admin Grid Layouts/AdminSalesMenGridLayout";
import AdminTableStructure from "../../Components/AdminTableStructure";

export default function SalesMen() {
  const { salesMenHeaderGridRow } = AdminSalesMenGridLayout();
  // const [selectedSalesMen, setSelectedSalesMen] = useState([]);
  return (
    <MUI.Box className="w-full">
      <MUI.Stack id="the container" className="w-full gap-10">
        <MUI.Typography variant="h4" className="dark:text-white">
          SalesMen
        </MUI.Typography>
        <MUI.Box id="sales men table">
          <AdminTableStructure
            rows={[
              {
                id: 1,
                avatar: "",
                name: "Ibrahim Kilani",
                email: "kilani@kilani.com",
                country: "Tunisia",
                role: "Admin",
                status: "Pending",
                dateJoined: "2021-10-10",
              },
              {
                id: 2,
                avatar: "",
                name: "Karam Suheil",
                email: "kilani@kilani.com",
                country: "Palestine",
                role: "Sales Man",
                status: "Active",
                dateJoined: "2023-06-10",
              },
            ]}
            columns={salesMenHeaderGridRow}
            // rowsSelected={selectedSalesMen}
            // setRowSelected={setSelectedSalesMen}
          />
        </MUI.Box>
      </MUI.Stack>
    </MUI.Box>
  );
}
