import { KeyboardEvent, RefObject } from "react";

export type PaginationTypes = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  search: string;
  sortOrder: number;
  sortBy: string;
  filter: string;
};
export type ActionType = {
  type: string;
  payload: any;
};

export class LoginFormModal {
  email: string = "";
  password: string = "";
}

export type APIResponseModal = {
  data: any;
  message: string;
  isSuccess: boolean;
};

export type ErrorResponseModal = {
  message: string;
  isSuccess: boolean;
  status: number;
};

export class Pagination {
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  totalPage: number = 0;
  search: string = "";
  sortOrder: number = 1;
  sortBy: string = "";
}

export type UserDataItem = {
  id: number;
  email: string;
  status?: number;
  profileCompleted?: boolean;
  country: string;
  countryCode?: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  personalDetails?: any;
};

export type siteAddress = {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  state: string;
};

export type SiteItem = {
  createdAt: string;
  description: string;
  isRecommend: boolean;
  siteAddress: siteAddress;
  siteImages: string[];
  siteName: string;
  status: number;
  updatedAt: string;
  _id: string;
};

export class Users {
  usersList: UserDataItem[] = [];
  pagination: PaginationTypes = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
    sortOrder: 0,
    total: 0,
    totalPage: 0,
    filter: "",
  };
  loading: boolean = false;
}

export class Sites {
  sitesList: SiteItem[] = [];
  page: Pagination = new Pagination();
  isLoading: boolean = false;
}

export type Side_Bar_Items = {
  id: string;
  title: string;
  imgURL: string;
  url: string;
};

export interface InputFieldProps {
  value: string;
  changeHandler: any;
  label: string;
  name: string;
  placeHolder: string;
  error?: any;
  touched?: any;
  errormessage?: any;
  onKeyDownHandler?: any;
  nextRef?: any;
  inputRef?: any;
  onSubmit?: any;
  type: string;
  disabled?: boolean;
}

export type KeyDownHandler = (
  event: KeyboardEvent,
  nextRef?: RefObject<HTMLElement>,
  submitHandler?: () => void
) => void;

export interface TableRows {
  name: string;
  sorting?: boolean;
  icon?: boolean;
  style?: any;
  sortHandler?: any;
}

export interface UserTableCols {
  serialNo: number;
  profileImage?: string;
  fullName: string;
  email: string;
  dob: string;
  contactNo: string;
  country: string;
  actions?: {
    edit?: boolean;
    delete?: boolean;
    detail?: boolean;
  };
}

export interface SiteTableCols {
  serialNo: number;
  siteName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  actions?: {
    edit: boolean;
    delete: boolean;
    detail?: boolean;
  };
}
export interface CityTableCols {
  serialNo: number;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  actions?: {
    edit: boolean;
    delete: boolean;
    detail?: boolean;
  };
}
