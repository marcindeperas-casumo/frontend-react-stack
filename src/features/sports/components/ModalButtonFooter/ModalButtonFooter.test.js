// @flow

import React from "react";
import { shallow } from "enzyme";
import { ButtonPrimary } from "@casumo/cmp-button";
import ModalButtonFooter from "./ModalButtonFooter";

describe("<ModalButtonFooter />", () => {
  test("should render children correctly", () => {
    const rendered = shallow(
      <ModalButtonFooter onClick={() => {}}>TEST CONTENT</ModalButtonFooter>
    );

    expect(rendered.contains("TEST CONTENT")).toBe(true);
  });

  test("should fire passed onClick when it is clicked", () => {
    const onClick = jest.fn();
    const rendered = shallow(
      <ModalButtonFooter onClick={onClick}>TEST CONTENT</ModalButtonFooter>
    );

    rendered.find(ButtonPrimary).simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
