import { stringify } from "qs";
import { cacheLocallyForMs, usingGET } from "../../../utils";
import sessionService from "../../session";

const api = ({ sessionService }) => {
  // TODO: How are we going to get these?
  //
  // I guess for this this will always be mobile since we are only going to serve
  // this code to mobile, but we need to find a better solution for them we
  // integrate it into site.
  const getPlatform = () => "mobile";
  const getCountryCode = async () => {
    const { country } = await sessionService.currentPlayer();
    if (!country) {
      throw new Error("Failed to get country");
    }
    return country;
  };

  const cacheFor10 = cacheLocallyForMs(30000);
  const cachedCountryCode = cacheFor10(() => getCountryCode());

  const queryHandshake = async () => {
    const countryCode = await cachedCountryCode();
    const platform = getPlatform();
    return usingGET(`gamebrowser/handshake/${platform}/${countryCode}`);
  };

  const queryTopList = async ({
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

  return {
    queryTopList: queryTopList,
    queryHandshake
  };
};

export default api({ sessionService });
