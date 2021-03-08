import { ButtonPrimary } from "@casumo/cmp-button";
import React from "react";
import { shallow } from "enzyme";
import ModalButtonFooter from "./ModalButtonFooter";

describe("<ModalButtonFooter />", () => {
  test("should render children correctly", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2786) FIXME: 'ModalButtonFooter' cannot be used as a JSX compon... Remove this comment to see the full error message
      <ModalButtonFooter onClick={() => {}}>TEST CONTENT</ModalButtonFooter>
    );

    expect(rendered.contains("TEST CONTENT")).toBe(true);
  });

  test("should fire passed onClick when it is clicked", () => {
    const onClick = jest.fn();
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2786) FIXME: 'ModalButtonFooter' cannot be used as a JSX compon... Remove this comment to see the full error message
      <ModalButtonFooter onClick={onClick}>TEST CONTENT</ModalButtonFooter>
    );

    rendered.find(ButtonPrimary).simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
