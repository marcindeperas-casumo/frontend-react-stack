import mockData from "./Valuable.json";
import { VALUABLE_TYPES } from "Models/valuables";
import { find, propEq } from "ramda";

const mockValuable = valuableType => {
    return find(propEq("valuableType", valuableType))(mockData) || mockData[0];
};

export default mockValuable;
