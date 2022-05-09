import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, isAuth }) => {
  const userData = JSON.parse(localStorage.getItem("chomp-food-user")) || null;

  if ((!userData || !userData.isLoggedin) && !isAuth) {
    return <Navigate to="/auth" />;
  }
  if (
    (isAdmin && userData.data && userData.data.role !== "ADMIN") ||
    (isAuth && userData)
  ) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

ProtectedRoute.defaultProps = {
  isAdmin: false,
  isAuth: false,
};

export default ProtectedRoute;
