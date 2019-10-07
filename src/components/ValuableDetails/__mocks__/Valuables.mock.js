import mockData from "./Valuables.json";
import { VALUABLE_TYPES } from "Models/valuables";
import { find, propEq } from "ramda";

export const mockValuable = valuableType => {
    return find(propEq("valuableType", valuableType))(mockData) || mockData[0];
};
