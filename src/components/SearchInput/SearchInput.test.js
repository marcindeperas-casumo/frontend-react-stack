import React from "react";
import { shallow } from "enzyme";
import { SearchIcon } from "@casumo/cmp-icons";
import SearchInput from "Components/SearchInput";

const clearButtonSelector = "div[data-test='search-input-clear-button']";

const value = "some search text";
const placeholder = "some placeholder text";

const baseProps = {
  onClear: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn(),
};

const props = { value, placeholder, ...baseProps };

describe("<SearchInput />", () => {
  describe("when the value is non-empty", () => {
    test("renders a search icon", () => {
      const component = shallow(<SearchInput {...props} />);

      expect(component.find(SearchIcon).length).toBe(1);
    });

    test("renders an input with the correct value", () => {
      const component = shallow(<SearchInput {...props} />);

      expect(component.find("input").prop("value")).toBe(value);
    });

    test("renders a clear button", () => {
      const component = shallow(<SearchInput {...props} />);

      expect(component.find(clearButtonSelector).length).toBe(1);
    });
  });

  describe("when the value is empty", () => {
    const props2 = { value: "", placeholder, ...baseProps };
    test("renders a search icon", () => {
      const component = shallow(<SearchInput {...props2} />);

      expect(component.find(SearchIcon).length).toBe(1);
    });

    test("renders an input with the correct placeholder", () => {
      const component = shallow(<SearchInput {...props2} />);
      const input = component.find("input");

      expect(input.prop("value")).toBe("");
      expect(input.prop("placeholder")).toBe(placeholder);
    });

    test("renders without a clear button", () => {
      const component = shallow(<SearchInput {...props2} />);

      expect(component.find(clearButtonSelector).length).toBe(0);
    });
  });

  describe("when the input has focus", () => {
    test("the `onFocus` callback is fired", () => {
      const onFocus = jest.fn();
      const component = shallow(<SearchInput {...{ ...props, onFocus }} />);
      const input = component.find("input");

      input.simulate("focus");
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the clear input button is clicked", () => {
    test("the `onClear` callback is fired", () => {
      const onClear = jest.fn();
      const component = shallow(<SearchInput {...{ ...props, onClear }} />);
      const clearButton = component.find(clearButtonSelector);

      clearButton.simulate("click");
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the input is changed", () => {
    test("the `onChange` callback is fired", () => {
      const onChange = jest.fn();
      const component = shallow(<SearchInput {...{ ...props, onChange }} />);
      const input = component.find("input");

      input.simulate("change", { target: { value: "new search text" } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
