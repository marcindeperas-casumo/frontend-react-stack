// @flow
import { useSelector, shallowEqual } from "react-redux";
import { countrySelector } from "Models/handshake";

export function useCountry() {
  return useSelector(countrySelector, shallowEqual);
}
