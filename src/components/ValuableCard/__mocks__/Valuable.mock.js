import MockDate from "mockdate";
import mockData from "./Valuable.json";
import { VALUABLE_TYPES } from "Models/valuables";
import { find, propEq } from "ramda";
import { DateTime } from "luxon";

export const mockValuable = valuableType => {
    return find(propEq("valuableType", valuableType))(mockData) || mockData[0];
};

export const mockExpiryDate = hoursFromNow => {
    return DateTime.local().plus({ hours: hoursFromNow });
};