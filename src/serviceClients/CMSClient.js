// TODO: Remove once the CuratedCardContainer stops depending on it
import { stringify } from "qs";
import { usingGET } from "Utils/index";

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
