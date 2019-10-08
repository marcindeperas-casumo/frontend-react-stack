import mockData from "./Valuable.json";
import { VALUABLE_TYPES } from "Models/valuables";
import { find, propEq } from "ramda";
import { DateTime } from "luxon";

export const mockValuable = valuableType => {
    return find(propEq("valuableType", valuableType))(mockData) || mockData[0];
};

export const mockExpiryDate = expiresWith24Hours => {
  const hours = expiresWith24Hours ? 4 : 30;

  return addHoursToNow(hours) / 1000;
}


const addHoursToNow = (hours: number) => {
  const result = new Date(Date.now());

  return result.setHours(result.getHours() + hours);
};
