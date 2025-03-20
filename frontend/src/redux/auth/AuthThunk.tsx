import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.services";
import { SUCCESS_TOAST } from "../../utils/showToast";
import toast from "react-hot-toast";

interface LoginPayload {
  email: string;
  password: string;
}
/**
 * @description all about auth extraReducer
 * @param {loginFoamData} data
 * @returns update Auth reducer
 */
export const checkAuth = createAsyncThunk(
  "auth/checkAuthenticated",
  async (_, thunkApi) => {
    try {
      const isAuthRes = await AuthService.doAuthCheck();
      console.log("auth check response in thunk :", isAuthRes);
      return thunkApi.fulfillWithValue(isAuthRes);
    } catch (error) {
      console.log("Error in auth check :", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const manualLogin = createAsyncThunk(
  "auth/manualLogin",
  async (payload: LoginPayload, thunkApi) => {
    try {
      const loginResp = await AuthService.doManualLogin(payload);
      console.log("login response in thunk :", loginResp);
      SUCCESS_TOAST(loginResp.message);
      return thunkApi.fulfillWithValue(loginResp);
    } catch (error: any) {
      console.log("login error in thunk :", error);
      // SHOW_ERROR_TOAST(error?.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const manualLogout = createAsyncThunk(
  "auth/manualLogout",
  async (id: string, thunkApi) => {
    const toastId = toast.loading("Logout...");
    try {
      const logoutResponse = await AuthService.doManualLogout(id);
      console.log("logout response in thunk :", logoutResponse);
      SUCCESS_TOAST(logoutResponse.message);
      return thunkApi.fulfillWithValue(logoutResponse);
    } catch (error: any) {
      console.log("logout error in thunk :", error);
      // SHOW_ERROR_TOAST(error?.message);
      return thunkApi.rejectWithValue(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
);
export const manualForgetPassword = createAsyncThunk(
  "auth/manualForgetPassword",
  async (payload: any, thunkApi) => {
    try {
      const forgetResponse = await AuthService.doForgetPassword(payload);
      console.log("forget password Response in thunk :", forgetResponse);
      toast.success(forgetResponse.message);
      return thunkApi.fulfillWithValue(forgetResponse);
    } catch (error: any) {
      console.log("Forget password error in thunk :", error);
      // SHOW_ERROR_TOAST(error?.error?.message || error?.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload: any, thunkApi) => {
    try {
      const response = await AuthService.doUpdateProfile(payload);
      console.log('update profile response in thunk : ',response);
      return thunkApi.fulfillWithValue(response);
    } catch (error: any) {
      console.log("Forget password error in thunk :", error);
      // SHOW_ERROR_TOAST(error?.error?.message || error?.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);
