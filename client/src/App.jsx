import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing";
import TopNav from "./Components/TopNav";
import "./App.css";
import "./Styles/header.css";
import { useEffect, useState } from "react";
import ProductsPage from "./Pages/ProductsPage";
import { Container } from "@mui/material";
import AdminDashBoard from "./Pages/AdminDashBoard";
import CreateProduct from "./Pages/CreateProduct";

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
    <div className={`${darkMode ? "dark" : ""}`}>
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
          </Routes>
        </Container>
      </div>
    </div>
  );
}
