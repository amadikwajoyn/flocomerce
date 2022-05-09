import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import ViewProduct from "./pages/ViewProducts/ViewProduct";
import "./App.css";
import Checkouts from "./pages/Checkout/Checkouts";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<ProtectedRoute isAdmin />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="auth" element={<ProtectedRoute isAuth />}>
            <Route path="" element={<LoginSignup />} />
          </Route>
          <Route path="view-products" element={<ProtectedRoute isAdmin />}>
            <Route path="" element={<ViewProduct />} />
          </Route>
          <Route path="checkout" element={<ProtectedRoute />}>
            <Route path="" element={<Checkouts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
