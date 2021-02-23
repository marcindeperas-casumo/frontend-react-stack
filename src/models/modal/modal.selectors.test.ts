// @flow
import {
  modalStateSelector,
  isModalHiddenSelector,
  isModalOpenSelector,
  isModalOpenToBeAcceptedSelector,
} from "Models/modal";

describe("Models/modal selectors", () => {
  test("modalStateSelector()", () => {
    const modal = {
      modalId: "some modal",
    };
    const state = {
      modal,
    };

    expect(modalStateSelector(state)).toEqual(modal);
  });

  test("isModalHiddenSelector()", () => {
    const modal = {
      modalId: null,
    };
    const state = {
      modal,
    };

    expect(isModalHiddenSelector(state)).toEqual(true);
  });

  test("isModalOpenSelector()", () => {
    const modal = {
      modalId: null,
    };
    const state = {
      modal,
    };

    expect(isModalOpenSelector(state)).toEqual(false);
  });

  describe("isModalOpenToBeAcceptedSelector()", () => {
    test("it returns false if there is no config", () => {
      const modal = {
        modalId: "some modal",
      };
      const state = {
        modal,
      };

      expect(isModalOpenToBeAcceptedSelector(state)).toEqual(false);
    });

    test("it returns false if there is config with mustAccept=false", () => {
      const modal = {
        modalId: "some modal",
        config: {
          mustAccept: false,
        },
      };
      const state = {
        modal,
      };

      expect(isModalOpenToBeAcceptedSelector(state)).toEqual(false);
    });

    test("it returns true if there is config with mustAccept=true", () => {
      const modal = {
        modalId: "some modal",
        config: {
          mustAccept: true,
        },
      };
      const state = {
        modal,
      };

      expect(isModalOpenToBeAcceptedSelector(state)).toEqual(true);
    });
  });
});
