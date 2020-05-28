// @flow
import { act } from "react-dom/test-utils";
import { type ReactWrapper } from "enzyme";

const findCheckbox = (rendered: ReactWrapper<any>) => rendered.find("Checkbox");

export const isCheckboxChecked = (rendered: ReactWrapper<any>) =>
  findCheckbox(rendered).prop("checked");

export const simulateClick = (rendered: ReactWrapper<any>) => {
  findCheckbox(rendered).simulate("click");
};

export const actWithClick = (rendered: ReactWrapper<any>) => {
  act(() => {
    simulateClick(rendered);
    jest.runAllTimers();
    rendered.update();
  });
};
