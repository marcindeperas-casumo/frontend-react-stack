import { isPlayActive } from "./ConfigurationForm";

describe("Compliance/SlotControlSystem/ConfigurationForm", () => {
  describe("isPlayActive()", () => {
    test("Should return true if budget is 0 because player might have free spins that will allow her to play", () => {
      const mockData = {
        balance: 100,
        budget: 0,
        time: 5,
        alertsEvery: 10,
        wantsBreak: false,
        breakAfter: null,
      };

      expect(isPlayActive(mockData)).toEqual(true);
    });

    test("Should return false if budget is undefined", () => {
      const mockData = {
        balance: 11,
        budget: undefined,
        time: 5,
        alertsEvery: 10,
        wantsBreak: false,
        breakAfter: null,
      };

      expect(isPlayActive(mockData)).toEqual(false);
    });

    test("Should return false if time is 0", () => {
      const mockData = {
        balance: 21,
        budget: 13,
        time: 0,
        alertsEvery: 10,
        wantsBreak: false,
        breakAfter: null,
      };

      expect(isPlayActive(mockData)).toEqual(false);
    });

    test("Should return false if time is undefined", () => {
      const mockData = {
        balance: 20,
        budget: 13,
        time: undefined,
        alertsEvery: 10,
        wantsBreak: false,
        breakAfter: null,
      };

      expect(isPlayActive(mockData)).toEqual(false);
    });

    test("Should return false if alertsEvery is 0", () => {
      const mockData = {
        balance: 200,
        budget: 13,
        time: 10,
        alertsEvery: 0,
        wantsBreak: false,
        breakAfter: null,
      };

      expect(isPlayActive(mockData)).toEqual(false);
    });

    test("Should return false if alertsEvery is undefined", () => {
      const mockData = {
        balance: 200,
        budget: 13,
        time: 10,
        alertsEvery: undefined,
        wantsBreak: false,
        breakAfter: null,
      };

      expect(isPlayActive(mockData)).toEqual(false);
    });

    test("Should return false if wantsBreak is true and breakAfter is undefined", () => {
      const mockData = {
        balance: 200,
        budget: 13,
        time: 10,
        alertsEvery: 5,
        wantsBreak: true,
        breakAfter: undefined,
      };

      expect(isPlayActive(mockData)).toEqual(false);
    });

    test("Should return true if wantsBreak is false and breakAfter is undefined", () => {
      const mockData = {
        balance: 200,
        budget: 13,
        time: 10,
        alertsEvery: 5,
        wantsBreak: false,
        breakAfter: undefined,
      };

      expect(isPlayActive(mockData)).toEqual(true);
    });

    test("Should return true if wantsBreak is true and breakAfter is defined", () => {
      const mockData = {
        balance: 200,
        budget: 13,
        time: 10,
        alertsEvery: 5,
        wantsBreak: true,
        breakAfter: 100,
      };

      expect(isPlayActive(mockData)).toEqual(true);
    });
  });
});
