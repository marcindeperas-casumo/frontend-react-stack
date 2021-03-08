import { values } from "ramda";
import { MODAL, MODAL_MAPPING } from "./Modals.config";

describe("Sports/Modals", () => {
  test("has a mapping configured for all modal types", () => {
    const modalTypes = values(MODAL);
    const assertTypeHasMapping = type =>
      expect(MODAL_MAPPING[type]).toBeDefined();

    modalTypes.forEach(assertTypeHasMapping);
  });
});
