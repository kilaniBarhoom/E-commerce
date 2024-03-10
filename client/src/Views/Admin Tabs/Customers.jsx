import * as MUI from "@mui/material";
import AdminTableStructure from "../../Components/AdminTableStructure";
import AdminCustomersGridLayout from "../../Constants/Admin Grid Layouts/AdminCustomersGridLayout";

export default function Customers() {
  const { customersHeaderGridRow } = AdminCustomersGridLayout();
  // const [selectedCostomers, setSelectedCustomers] = useState([]);
  return (
    <MUI.Box className="w-full">
      <MUI.Stack id="the container" className="w-full gap-10">
        <MUI.Typography variant="h4" className="dark:text-white">
          Customers
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
                purchaseAmount: 3000,
                lastOrder: "2021-10-10",
              },
            ]}
            columns={customersHeaderGridRow}
            // rowsSelected={selectedCostomers}
            // setRowSelected={setSelectedCustomers}
          />
        </MUI.Box>
      </MUI.Stack>
    </MUI.Box>
  );
}
