import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// auth
export const postAdminLogin = (data: any) => {
  return api.create(url.ADMIN_LOGIN, data);
};

export const getProfileDetails = () => {
  return api.get(url.GET_PROFILE);
};

export const postAdminLogout = () => {
  return api.create(url.ADMIN_LOGOUT);
};
