import { usingGET } from "../../../utils";
import queryString from "query-string";

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
const getCountryCode = () => "mt";

export const queryHandshake = () =>
  usingGET(`gamebrowser/handshake/${getPlatform()}/${getCountryCode()}`);

export const queryTopList = ({ id, variant, hash, page = 0, pageSize = 10 }) =>
  usingGET(
    `gamebrowser/games-lists/${getPlatform()}/${getCountryCode()}/${id}?${queryString.stringify(
      { hash, variant, page, pageSize }
    )}`
  );
