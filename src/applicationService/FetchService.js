import { commonFetch } from "../lib/utils";

export const fetchService = ({ method, url, data }) => {
  return commonFetch(url, {
    method,
    ...data,
  });
};

export default fetchService;
