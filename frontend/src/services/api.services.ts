import axios, { AxiosResponse } from "axios";
import SHOW_ERROR_TOAST, { SHOW_INTERNET_TOAST } from "../utils/showToast";
import { store } from "../redux/store";
import { emptyReducer } from "../redux/auth/AuthSlice";
const SOMETHING_WENT_WRONG = "OOPS! something went wrong";

/**
 * @var status_code
 * @description Defined all static API status Code
 * all about our axios setup
 */
export const status_code = {
  // standard api codes
  success: 200,
  invalid: 400,
  timeout: 408,
  notFound: 204,
  badRequest: 400,
  userDelete: 410,
  serverError: 500,
  Unauthorized: 401,
  successAction: 201,
};

// const successCodes = [200, 201];        standards api values
// const sessionExpiryCodes = [403, 401];

/**
 * create axios instance
 */
export const $http = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    language: "EN",
    platform: "web",
  },
});

$http.interceptors.request.use(async (config: any) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken && accessToken?.length > 0) {
    config.headers["Authorization"] = `bearer ${accessToken}`;
  }
  return config;
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log("onResponse in interceptor :", response);
  console.log("data from response interception :", response.data);
  return response.data;
};

const onErrorResponse = (error: any) => {
  console.log("error in interceptor :", error);
  const message =
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.response?.statusText ||
    error?.message ||
    SOMETHING_WENT_WRONG;

  const status = error?.response?.status || error?.status;
  const errorToSend = { message, status };

  if (!error.response) {
    // handling network error here
    if (error.code === "ECONNABORTED") {
      console.log("Request Timeout || ECONNABORTED");
      SHOW_ERROR_TOAST("Request timeout. Please try again.");
      return Promise.reject({
        message: "Request timeout. Please try again.",
        status: 408,
      });
    }
    console.log("Network Error || No response received");
    SHOW_INTERNET_TOAST();
    return Promise.reject({
      message: "Network error. Please check your internet connection.",
      status: 0,
    });
  }

  console.log("error to send from interceptor:", errorToSend);
  switch (status) {
    case 401:
      sessionExpireHandler();
      console.log("401 || UNAUTHORIZED ACCESS");
      break;
    case 404:
      console.log("404 || API NOT FOUND");
      break;
    case 500:
      console.log("500 || SERVER ERROR");
      break;
    default:
      console.log("Network Error Status Code:", status);
  }
  SHOW_ERROR_TOAST(message);
  return Promise.reject(errorToSend);
};

$http.interceptors.response.use(onResponse, onErrorResponse);

const ApiService = {
  getApi: async (endPoint: string, params: string) => {
    return await $http.get(endPoint + params, {});
  },
  putApi: async (endPoint: string, params: object) => {
    return await $http.put(endPoint, params);
  },
  postApi: async (endPoint: string, params: object | Array<Object>) => {
    return await $http.post(endPoint, params);
  },
  deleteApi: async (endPoint: string, callback: Function) => {
    return await $http.delete(endPoint);
  },
};

const sessionExpireHandler = () => {
  console.log("session expire called");
  store.dispatch(emptyReducer());
  // localStorage.clear();
};

export default ApiService;
