import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { apiService } from "./utils/services";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("jwt");
  const checkAuth = async () => {
    try {
      const res = await apiService.get("/auth/check");
      console.log("response :", res);
    } catch (error) {
      console.log("Error in checkAuth", error);
    }
  };
  React.useEffect(() => {
    checkAuth();
  }, []);
  console.log("token :", token);
  return (
    <Routes>
      <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />}
      />
      <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      <Route path="*" element={<PageNotFound />} />

      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
