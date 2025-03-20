import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  manualLogin,
  manualLogout,
  manualForgetPassword,
  updateProfile,
} from "./AuthThunk";
type authReducer = {
  loading: boolean;
  userDetails: any;
  accessToken: string;
  id: string;
};
const initialState: authReducer = {
  loading: false,
  userDetails: {},
  accessToken: "",
  id: "",
};
/**
 * @name authSlice
 * @description slice for auth reducer
 * @returns state of auth reducer
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    emptyReducer: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      return {
        ...state,
        ...{ loading: true },
      };
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      return {
        ...state,
        ...{
          loading: false,
          userDetails: action.payload.data,
          accessToken: action.payload.data?.token,
        },
      };
    });
    builder.addCase(checkAuth.rejected, (state) => {
      return {
        ...state,
        ...{ loading: false },
      };
    });
    //   // Login cases
    builder.addCase(manualLogin.pending, (state) => {
      return {
        ...state,
        ...{ loading: true },
      };
    });
    builder.addCase(manualLogin.fulfilled, (state, action) => {
      return {
        ...state,
        ...{
          loading: false,
          userDetails: action.payload?.data,
          accessToken: action.payload.data?.token,
        },
      };
    });
    builder.addCase(manualLogin.rejected, (state) => {
      return {
        ...state,
        ...{ loading: false },
      };
    });
    builder.addCase(updateProfile.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      return {
        ...state,
        ...{
          loading: false,
          userDetails: action.payload?.data,
        },
      };
    });
    builder.addCase(updateProfile.rejected, (state) => ({
      ...state,
      loading: false,
    }));
    //   // Logout cases
    //   builder.addCase(manualLogout.pending, (state) => {
    //     return {
    //       ...state,
    //       ...{ loading: true },
    //     };
    //   });
    //   builder.addCase(manualLogout.fulfilled, () => {
    //     return initialState;
    //   });

    //   builder.addCase(manualLogout.rejected, (state) => {
    //     return { ...state, ...{ loading: false } };
    //   });

    //   // Forget Password cases
    //   builder.addCase(manualForgetPassword.pending, (state) => {
    //     return { ...state, loading: true };
    //   });
    //   builder.addCase(manualForgetPassword.fulfilled, (state, action) => {
    //     console.log("action data :", action.payload);
    //     return { ...state, ...action.payload.data, loading: false };
    //   });
    //   builder.addCase(manualForgetPassword.rejected, (state) => {
    //     return { ...state, loading: false };
    //   });
  },
});

export const { updateLoading, emptyReducer } = authSlice.actions;
export default authSlice.reducer;
