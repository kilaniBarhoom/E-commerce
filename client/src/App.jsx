import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/TopNav";
import AdminDashBoard from "./Pages/AdminDashBoard";
import ProductView from "./Pages/ProductView";
import CreateProduct from "./Pages/CreateProduct";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import ProductsPage from "./Pages/ProductsPage";
import Signup from "./Pages/Signup";
import "./Styles/header.css";

// import { Container } from "@mui/material";

export default function App() {
  const history = useLocation();
  const currentPath = history.pathname;
  const [showNav, setShoWNav] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentPath == "/login" || currentPath == "/signup") {
      setShoWNav(false);
    } else {
      setShoWNav(true);
    }
  });

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);
  return (
    <div className={`${darkMode ? "dark" : ""} `}>
      <div className="dark:bg-neutral-900 min-h-screen">
        <Container maxWidth="xl">
          {showNav && <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<ProductsPage />} />
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route
              path="/admin/products/:productId"
              element={<ProductView />}
            />
            <Route path="*" element={<Landing />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}
