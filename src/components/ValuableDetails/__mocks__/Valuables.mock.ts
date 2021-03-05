import mockData from "./Valuables.json";
import { VALUABLE_TYPES } from "Models/valuables";
import { find, propEq } from "ramda";
import {
  mockExpiryDate,
} from "Components/ValuableCard/__mocks__/Valuable.mock";

export const mockValuable = valuableType => {
    const mockedValuable = find(propEq("valuableType", valuableType))(mockData) || mockData[0];
    return {
        ...mockedValuable,
        expiryDate: mockExpiryDate(false),
    }
};
