import axios, { AxiosResponse, AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor
const onResponse = (response: AxiosResponse) => {
  console.info("✅ API Response:", response.config.url, response);
  return response.data; // Return only the data for cleaner API responses
};

// Error Interceptor
const onError = (error: AxiosError) => {
  if (error.response) {
    const { status = 500, data } = error.response;
    return Promise.reject({
      isSuccess: false,
      status,
      message: data?.message || "An unexpected error occurred.",
      error,
    });
  }

  return Promise.reject({
    isSuccess: false,
    status: 500,
    message: "Network error or no response received.",
    error,
  });
};

api.interceptors.response.use(onResponse, onError);

// API Service Wrapper
export const apiService = {
  get: <T>(url: string, params?: object) => api.get<T>(url, { params }),
  post: <T>(url: string, payload: object) => api.post<T>(url, payload),
  put: <T>(url: string, payload: object) => api.put<T>(url, payload),
  delete: <T>(url: string) => api.delete<T>(url),
};
