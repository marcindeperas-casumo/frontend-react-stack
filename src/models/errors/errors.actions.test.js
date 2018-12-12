import { logError } from "./errors.actions";
import { TYPES } from "./errors.constants";

describe("Models/Errors/Actions", () => {
  describe("logError()", () => {
    test("sets the action type", () => {
      const message = "Foo";
      const error = new Error(message);
      const action = logError(message, error);

      expect(action.type).toBe(TYPES.ERROR);
    });

    test("adds the error and the message on the action", () => {
      const message = "Foo";
      const error = new Error(message);
      const action = logError(message, error);

      expect(action).toHaveProperty("message", message);
      expect(action).toHaveProperty("error", error);
    });

    test("spreads the rest property on the action object", () => {
      const message = "Foo";
      const error = new Error(message);
      const rest = { foo: "123", bar: "456" };
      const action = logError(message, error, rest);

      expect(action).toHaveProperty("foo", rest.foo);
      expect(action).toHaveProperty("bar", rest.bar);
    });
  });
});
