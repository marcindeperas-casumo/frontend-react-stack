import { usingGET } from "../utils";

const httpService = {
  get: usingGET,
};

export const CMSClientFactory = ({ http }) => {
  const queryPage = ({ lang, slug, hash }) =>
    http.get(`cmsquery/v2/root/${lang}/${slug}?hash=${hash}`);

  return { queryPage };
};

export default CMSClientFactory({ http: httpService });
