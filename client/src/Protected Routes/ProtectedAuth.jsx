import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

ProtectedAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
