import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/TopNav";
import AdminDashBoard from "./Pages/AdminDashBoard";
import AdminProductView from "./Pages/AdminProductView";
import CreateProduct from "./Pages/CreateProduct";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import ProductsPage from "./Pages/ProductsPage";
import Signup from "./Pages/Signup";
import "./Styles/header.css";
import ProtectedAuth from "./Protected Routes/ProtectedAuth";
import { Account } from "./Pages/Account";
import { ThemeContext } from "./Contexts/ThemeProvider";
import { io } from "socket.io-client";

// import { Container } from "@mui/material";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    if (user) {
      socket?.emit("newUser", user._id);
    }
  }, [socket, user]);

  return (
    <div className={`${darkMode ? "dark" : ""} `}>
      <div className="dark:bg-neutral-900 min-h-screen">
        <Container maxWidth="xl">
          <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <TopNav socket={socket} />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/login"
                element={
                  <ProtectedAuth>
                    <Login />
                  </ProtectedAuth>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedAuth>
                    <Signup socket={socket} />
                  </ProtectedAuth>
                }
              />
              <Route path="/categories" element={<ProductsPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path="/admin" element={<AdminDashBoard />} />
              <Route
                path="/admin/products/:productId"
                element={<AdminProductView />}
              />
              <Route path="*" element={<Landing />} />
            </Routes>
          </ThemeContext.Provider>
        </Container>
      </div>
    </div>
  );
}
