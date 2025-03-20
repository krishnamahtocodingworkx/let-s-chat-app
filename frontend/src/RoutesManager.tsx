import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import { store } from "./redux/store";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/auth/AuthThunk";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const RoutesManager = () => {
  const pathname = window.location.pathname;
  const token = store.getState().auth.accessToken;
  const dispatch: Function = useDispatch();
  console.log("token :", token);
  React.useEffect(() => {
    if (!token && pathname !== "/signup" && pathname !== "/login") {
      dispatch(checkAuth());
    }
  }, []);
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          index
          element={token ? <Dashboard /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="*"
          element={token ? <Navigate to={"/"} /> : <PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesManager;
