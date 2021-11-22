import mockData from "./Valuables.json";
import { find, propEq } from "ramda";
import {
  mockExpiryDate,
} from "Components/ValuableCard/__mocks__/Valuable.mock";
import { ValuableDetails_PlayerValuableFragment } from "Src/types/apollo";
import { AllValuableTypes } from "Components/ValuableThumbnail/ValuableSymbol";

export const mockValuable = (valuableType: AllValuableTypes) => {
    const mockedValuable = find(propEq("valuableType", valuableType))(mockData) || mockData[0];
    return {
        ...mockedValuable,
        expiryDate: mockExpiryDate(false),
    } as ValuableDetails_PlayerValuableFragment
};
