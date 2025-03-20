import ApiService from "./api.services";
import { ENDPOINTS } from "../utils/endPoints";
import { APIResponseModal } from "../utils/modal";
/**
 * @name AuthService
 * @description api calls for authentication
 * @returns state / nothing for redux
 */
const AuthService = {
  doAuthCheck: async (): Promise<APIResponseModal> => {
    return new Promise((res, rej) => {
      ApiService.getApi(ENDPOINTS.AUTH.CHECK_AUTH, "")
        .then((res: any) => {
          console.log("response of is auth :", res);
          // if (res?.data) {
          res({ isSuccess: true, data: res.data, message: res.message });
          // }
        })
        .catch((error: any) => {
          console.log("Error in is auth :", error);
          rej({ ...error, isSuccess: false });
        });
    });
  },
  doManualLogin: async (params: any): Promise<APIResponseModal> => {
    return new Promise((resolve, reject) => {
      ApiService.postApi(ENDPOINTS.AUTH.LOGIN, params)
        .then((res: any) => {
          console.log("auth login response", res);
          if (res?.data) {
            resolve({
              isSuccess: true,
              data: res.data,
              message: res.message,
            });
          }
          reject({ ...res, isSuccess: false });
        })
        .catch((err) => {
          console.log("error in login api call", err);
          reject({ ...err, isSuccess: false });
        });
    });
  },
  doManualLogout: async (id: string): Promise<APIResponseModal> => {
    return new Promise((resolve, reject) => {
      ApiService.postApi(`${ENDPOINTS.AUTH.LOGOUT}/${id}`, {})
        .then((res: any) => {
          console.log("logout Response :", res);
          resolve({
            isSuccess: true,
            message: res?.message,
            data: res?.data,
          });
        })
        .catch((error) => {
          console.log("logout error :", error);
          reject({ ...error, isSuccess: false });
        });
    });
  },
  doForgetPassword: async (payload: any): Promise<APIResponseModal> => {
    console.log("payload :", payload);
    return new Promise((resolve, reject) => {
      ApiService.postApi(ENDPOINTS.AUTH.FORGOT_PASSWORD, payload)
        .then((res: any) => {
          console.log("Forget password response in auth services :", res);
          resolve({ isSuccess: true, message: res.message, data: res.data });
        })
        .catch((error) => {
          console.log("Forget password error :", error);
          reject({ ...error, isSuccess: false });
        });
    });
  },
  doVerifyOtp: async (payload: any, callback: any) => {
    try {
      const res: any = await ApiService.postApi(
        ENDPOINTS.AUTH.VERIFY_OTP,
        payload
      );
      console.log("verifyOtpResponse :", res);
      callback({ isSuccess: true, message: res?.message, data: res.data });
    } catch (error: any) {
      console.log("verifyOtp Error :", error);
      callback({ ...error, isSuccess: false });
    }
  },
  doResendOtp: async (payload: any, callback: any) => {
    try {
      const res: any = await ApiService.postApi(
        ENDPOINTS.AUTH.FORGOT_PASSWORD,
        payload
      );
      console.log("Resend otp response :", res);
      callback({ isSuccess: true, ...res });
    } catch (error: any) {
      console.log("Resend otp Error :", error);
      callback({ isSuccess: false, ...error });
    }
  },
  doResetPassword: async (payload: any, callback: any) => {
    try {
      const res = await ApiService.postApi(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        payload
      );
      console.log("Reset Password Response :", res);
      callback({ isSuccess: true, ...res });
    } catch (error: any) {
      console.log("Reset Password Error :", error);
      callback({ isSuccess: false, ...error });
    }
  },
};

export default AuthService;
