import { toast } from "react-hot-toast";

/**
 * @function TOAST
 * @description TOASTS FOR DIFFERENT ACTIONS
 */

const SHOW_ERROR_TOAST = (message = "OOPS! something went wrong") => {
  message = message.toString();
  toast.error(message);
};

export const SHOW_INTERNET_TOAST = () => {
  toast.error("Please check your internet connections.");
};

export const LOGOUT_TOAST = () => {
  toast.success("Logout Successfull");
};
export const SUCCESS_TOAST = (message = "Successful") => {
  message = message.toString();
  toast.success(message);
};

export default SHOW_ERROR_TOAST;
