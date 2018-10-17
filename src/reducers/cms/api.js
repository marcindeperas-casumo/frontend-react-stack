import { stringify } from "qs";
import { usingGET as httpGet } from "Utils/index";

export const getPageBySlug = async ({ slug, hash, lang }) => {
  // TODO: figure out a better way for guessing the platform (e.g. central config)
  const platform = "mobile";
  const queryParams = { hash };
  const queryString = stringify(queryParams, { skipNulls: true });
  const url = `cmsquery/v2/root/${lang}/${platform}.${slug}?${queryString}`;
  const response = await httpGet(url);

  return { cms: response };
};
