/**
 * @description ENDPOITS for all apis
 */

export const ENDPOINTS = {
  AUTH: {
    CHECK_AUTH: "/api/auth/check",
    LOGIN: `/api/auth/login`,
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    FORGOT_PASSWORD: "/admin/resend-otp",
    SEND_OTP: "/admin/send-otp",
    VERIFY_OTP: "/admin/verify-otp",
    PROFILE: "/admin/profile",
    CHANGE_PASSWORD: "/admin/change-password",
    EDIT_PROFILE: "/admin/profile",
    RESET_PASSWORD: "/admin/reset-password",
  },
  USERS: {
    GET_ALL_URERS: "/admin/users",
    USER_DETAIL: "/admin/user/",
    BLOCK_UNBLOCK_USER: "/admin/user/status",
  },
  CMS: {
    CMS_lIST: "/admin/cms/list",
    UPDATE_CMS: "/admin/cms",
    CMS_DETAILS: "/admin/cms",
  },
  SITES: {
    SITES_LIST: "/admin/site/list",
    ADD_SITE: "/admin/site",
    UPLOAD_IMAGE: "/common/file/upload/request",
    SITE_DETAIL: "/admin/site",
    UPDATE_STATUS: "/admin/site/status",
  },
  CITIES: {
    CITIES_LIST: "/admin/city/list",
    CITY_DETAIL: "/admin/city",
    CITY_UPDATE: "/admin/city",
  },
};
