// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { DepositLimitsConfirmations } from "./DepositLimitsConfirmations";
import t from "./__mocks__/cms";

const props = {
  t,
  pages: ["SAVED_RIGHT_AWAY", "RG_REQUIRED"],
  lastButtonAction: () => {},
  fetchTranslations: () => {},
  lastButtonCaption: "button_answer_questions",
};

describe("DepositLimitsConfirmations", () => {
  test("clicking button causes page to change", () => {
    const rendered = shallow(<DepositLimitsConfirmations {...props} />);
    const getText = () =>
      rendered
        .find({ "data-test-id": "txt" })
        .dive()
        .text();
    const before = getText();
    rendered.find({ "data-test-id": "buttonNext" }).simulate("click");
    const after = getText();
    expect(before).not.toEqual(after);
  });

  test("doesn't call lastButtonAction() if it is not the last page", () => {
    const lastButtonAction = jest.fn();
    const rendered = shallow(
      <DepositLimitsConfirmations
        {...props}
        lastButtonAction={lastButtonAction}
      />
    );

    rendered.find({ "data-test-id": "buttonNext" }).simulate("click");
    expect(lastButtonAction).not.toBeCalled();
  });

  test("lastButtonAction() is only triggered once when finishing the flow", () => {
    const lastButtonAction1 = jest.fn();
    const rendered1 = shallow(
      <DepositLimitsConfirmations
        {...props}
        lastButtonAction={lastButtonAction1}
      />
    );
    // two pages so we have to click it twice
    rendered1.find({ "data-test-id": "buttonNext" }).simulate("click");
    rendered1.find({ "data-test-id": "buttonNext" }).simulate("click");
    expect(lastButtonAction1).toBeCalledTimes(1);

    const lastButtonAction2 = jest.fn();
    const rendered2 = shallow(
      <DepositLimitsConfirmations
        {...props}
        pages={["SAVED_RIGHT_AWAY"]}
        lastButtonAction={lastButtonAction2}
      />
    );
    rendered2.find({ "data-test-id": "buttonNext" }).simulate("click");
    expect(lastButtonAction2).toBeCalledTimes(1);
  });
});
