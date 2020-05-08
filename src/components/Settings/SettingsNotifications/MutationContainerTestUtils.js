// @flow
import { type ReactWrapper } from "enzyme";

const findCheckbox = (rendered: ReactWrapper<any>, ParentComponent: any) =>
  rendered.find(ParentComponent).find("Checkbox");

export const isCheckboxChecked = (rendered: any, ParentComponent: any) =>
  findCheckbox(rendered, ParentComponent).prop("checked");

export const simulateClick = (rendered: any, ParentComponent: any) => {
  findCheckbox(rendered, ParentComponent).simulate("click");
};

export const actWithClick = (rendered: any, ParentComponent: any) => {
  simulateClick(rendered, ParentComponent);
  jest.runAllTimers();
  rendered.update();
};
