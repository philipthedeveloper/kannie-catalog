import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// auth
export const getAnalytics = () => {
  return api.get(url.GET_ANALYTICS);
};
