import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing";
import Footer from "./Components/Footer";
import TopNav from "./Components/TopNav";
import "./App.css";
import "./Styles/header.css";
import Categories from "./Pages/Categories";
import { useEffect, useState } from "react";

// import { Container } from "@mui/material";

export default function App() {
  const history = useLocation();
  const currentPath = history.pathname;
  const [showNav, setShoWNav] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (
      currentPath == "/login" ||
      currentPath == "/signup" ||
      currentPath.startsWith("/admin")
    ) {
      setShoWNav(false);
    } else {
      setShoWNav(true);
    }
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <div>
      {showNav && <TopNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admin" element={<Categories />} />
      </Routes>

      {/* <footer>
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </footer> */}
    </div>
  );
}
