import { stringify } from "qs";
import { usingGET, cacheLocallyForMs } from "../../../utils";
import sessionService from "../../session";

// TODO: How are we going to get these?
//
// I guess for this this will always be mobile since we are only going to serve
// this code to mobile, but we need to find a better solution for them we
// integrate it into site.
const getPlatform = () => "mobile";
// TODO: How are we going to get these?
//
// In terms of good API design, should we let the consumer (mobile) to specify
// the country code, or shall we let the back-end infer it from the request?
const getCountryCode = async () => {
  const { country } = await sessionService.currentPlayer();

  return country;
};

const cacheFor10 = cacheLocallyForMs(30000);
const cachedCountryCode = cacheFor10(() => getCountryCode());

export const queryHandshake = async () => {
  const countryCode = await cachedCountryCode();
  const platform = getPlatform();
  return usingGET(`gamebrowser/handshake/${platform}/${countryCode}`);
};

export const queryTopList = async ({
  id,
  variant,
  hash,
  page = 0,
  pageSize = 10
}) => {
  const countryCode = await cachedCountryCode();
  const platform = getPlatform();
  return usingGET(
    `gamebrowser/games-lists/${platform}/${countryCode}/${id}?${stringify(
      { hash, variant, page, pageSize },
      { skipNulls: true }
    )}`
  );
};
