import * as MUI from "@mui/material";
import AdminTableStructure from "../../Components/AdminTableStructure";
import AdminOrdersGridLayout from "../../Constants/Admin Grid Layouts/AdminOrdersGridLayout";

export default function Orders() {
  const { ordersHeaderGridRow } = AdminOrdersGridLayout();
  // const [selectedOrders, setSelectedOrders] = useState([]);
  return (
    <MUI.Box className="w-full">
      <MUI.Stack id="the container" className="w-full gap-10">
        <MUI.Typography variant="h4" className="dark:text-white">
          Orders
        </MUI.Typography>
        <MUI.Box id="orders table">
          <AdminTableStructure
            rows={[
              {
                id: 1,
                customer: {
                  avatar: "",
                  name: "kilani",
                  email: "kilani@kilani.com",
                },
                items: 5,
                orderAmount: 300,
                status: "Pending",
                orderDate: "2021-10-10",
              },
            ]}
            columns={ordersHeaderGridRow}
            // rowsSelected={selectedOrders}
            // setRowSelected={setSelectedOrders}
          />
        </MUI.Box>
      </MUI.Stack>
    </MUI.Box>
  );
}
