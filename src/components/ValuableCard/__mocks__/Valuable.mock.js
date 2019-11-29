import mockData from "./Valuable";
import { VALUABLE_TYPES, type ValuableType, type ValuableListProps } from "Models/valuables";
import { find, propEq } from "ramda";
import { DateTime } from "luxon";

export const mockValuable = (valuableType) => {
    const mockedValuable = find(propEq("valuableType", valuableType))(mockData) || mockData[0];
    return {
        ...mockedValuable,
        expiryDate: mockExpiryDate(false),
    }
};

export const mockValuables = (valuableType = null) => {
  return valuableType ?
    mockData.filter(valuable => valuable.valuableType === valuableType) :
    mockData;
}

export const mockExpiryDate = (expiresWith24Hours) => {
  const hours = expiresWith24Hours ? 4 : 30;

  return addHoursToNow(hours) / 1000;
}


const addHoursToNow = (hours) => {
  const result = new Date(Date.now());

  return result.setHours(result.getHours() + hours);
};
