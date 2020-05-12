// @flow
import { act } from "react-dom/test-utils";
import { type ReactWrapper } from "enzyme";

const findCheckbox = (rendered: ReactWrapper<any>, ParentComponent: any) =>
  rendered.find("Checkbox");

export const isCheckboxChecked = (rendered: any, ParentComponent: any) =>
  findCheckbox(rendered).prop("checked");

export const simulateClick = (rendered: any, ParentComponent: any) => {
  findCheckbox(rendered).simulate("click");
};

export const actWithClick = (rendered: any, ParentComponent: any) => {
  act(() => {
    simulateClick(rendered);
    jest.runAllTimers();
    rendered.update();
  });
};
