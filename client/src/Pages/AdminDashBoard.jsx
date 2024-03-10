import * as MUI from "@mui/material";
import { useEffect, useState } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useNavigate } from "react-router-dom";
import AdminNav from "../Components/AdminNav";
import Customers from "../Views/Admin Tabs/Customers";
import Orders from "../Views/Admin Tabs/Orders";
import Products from "../Views/Admin Tabs/Products";
import Reviews from "../Views/Admin Tabs/Reviews";
import SalesMen from "../Views/Admin Tabs/SalesMen";

export default function AdminDashBoard() {
  const nav = useNavigate();
  const [adminTabQuery, setAdminTabQuery] = useState("");
  useEffect(() => {
    const rememberedTabFromLocalStorage = localStorage.getItem("adminTabQuery");
    if (rememberedTabFromLocalStorage) {
      setAdminTabQuery(localStorage.getItem("adminTabQuery"));
    } else {
      setAdminTabQuery("main");
    }
  }, []);

  const tabRender = (tabName) => {
    if (tabName === "main")
      return <MUI.Typography variant="h3">Admin Page</MUI.Typography>;

    if (tabName === "products") {
      localStorage.setItem("adminTabQuery", "products");
      return <Products />;
    } else if (tabName === "orders") {
      localStorage.setItem("adminTabQuery", "orders");
      return <Orders />;
    } else if (tabName === "customers") {
      localStorage.setItem("adminTabQuery", "customers");
      return <Customers />;
    } else if (tabName === "salesmen") {
      localStorage.setItem("adminTabQuery", "salesmen");
      return <SalesMen />;
    } else if (tabName === "reviews") {
      localStorage.setItem("adminTabQuery", "reviews");
      return <Reviews />;
    } else {
      localStorage.setItem("adminTabQuery", "main");
    }
  };
  return (
    <MUI.Box>
      <MUI.Box mt={3} role="presentation">
        <MUI.Breadcrumbs
          aria-label="breadcrumb"
          className="dark:text-white"
          mb={2}
        >
          <MUI.Link
            underline="hover"
            className="cursor-pointer"
            color="inherit"
            onClick={() => nav("/")}
          >
            Home
          </MUI.Link>
          <MUI.Link
            underline="hover"
            color="inherit"
            className="cursor-pointer"
            onClick={() => setAdminTabQuery("main")}
          >
            Admin Page
          </MUI.Link>
          <MUI.Link
            underline="none"
            className="dark:text-neutral-400"
            aria-current="page"
            onClick={() => nav("/admin")}
          >
            {adminTabQuery[0]?.toUpperCase()}
            {adminTabQuery?.slice(1).toLowerCase()}
          </MUI.Link>
        </MUI.Breadcrumbs>
      </MUI.Box>
      <FadeIn>
        <MUI.Stack className="flex gap-3 flex-row w-full">
          <MUI.Box sx={{ display: { xs: "none", md: "flex" } }}>
            <AdminNav
              adminTabQuery={adminTabQuery}
              setAdminTabQuery={setAdminTabQuery}
            />
          </MUI.Box>

          <MUI.Box className="overflow-hidden w-full">
            {tabRender(adminTabQuery)}
          </MUI.Box>
        </MUI.Stack>
      </FadeIn>
    </MUI.Box>
  );
}
