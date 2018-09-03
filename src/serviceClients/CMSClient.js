import { stringify } from "qs";
import { usingGET } from "../lib/utils";

const httpService = {
  get: usingGET,
};

export const CMSClientFactory = ({ http }) => {
  const queryPage = ({ lang, slug, hash }) =>
    http.get(
      `cmsquery/v2/root/${lang}/${slug}?${stringify(
        { hash },
        { skipNulls: true }
      )}`
    );

  return { queryPage };
};

export default CMSClientFactory({ http: httpService });