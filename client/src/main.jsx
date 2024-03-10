import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Router>
);
