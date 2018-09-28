import { commonFetch, sleep } from "Utils/utils";

export const fetchService = ({ method, url, data }) => {
  return commonFetch(url, {
    method,
    ...data,
  }); //.then(sleep(5000));
};

export default fetchService;
