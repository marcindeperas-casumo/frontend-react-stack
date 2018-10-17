import { commonFetch } from "Utils/utils";

export const fetchService = ({ method, url, data }) => {
  return commonFetch(url, {
    method,
    ...data,
  });
};

export default fetchService;
