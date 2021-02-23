// @flow
import * as React from "react";
import * as R from "ramda";
import { shallow, mount } from "enzyme";
import { ResponsibleGamblingTest } from "./ResponsibleGamblingTest";

const props = {
  t: {
    yes: "yes",
    no: "no",
    questions: [
      {
        question: "0",
        answer: "yes",
      },
      {
        question: "1",
        answer: "yes",
      },
      {
        question: "2",
        answer: "yes",
      },
      {
        question: "3",
        answer: "yes",
      },
      {
        question: "4",
        answer: "yes",
      },
    ],
  },
  sendRGTestResult: () => {},
  fetchQuestions: () => {},
};
const numberOfQuestions = props.t.questions.length;

describe("ResponsibleGamblingTest", () => {
  test("fetchQuestions is called on mount", () => {
    const fetchQuestions = jest.fn();
    mount(
      <ResponsibleGamblingTest {...props} fetchQuestions={fetchQuestions} />
    );

    expect(fetchQuestions).toHaveBeenCalledTimes(1);
  });

  test("has 2 required buttons", () => {
    const rendered = shallow(<ResponsibleGamblingTest {...props} />);

    expect(rendered.find({ "data-test-id": "buttonYes" })).toHaveLength(1);
    expect(rendered.find({ "data-test-id": "buttonNo" })).toHaveLength(1);
  });

  test("clicking buttons causes page to change", () => {
    const rendered = shallow(<ResponsibleGamblingTest {...props} />);
    const getText = () =>
      rendered
        .find("Text")
        .dive()
        .text();
    expect(getText()).toEqual("0");
    rendered.find({ "data-test-id": "buttonNo" }).simulate("click");
    expect(getText()).toEqual("1");
    rendered.find({ "data-test-id": "buttonNo" }).simulate("click");
    expect(getText()).toEqual("2");
    rendered.find({ "data-test-id": "buttonYes" }).simulate("click");
    expect(getText()).toEqual("3");
  });

  test('giving answer "no" to all questions allows user to pass test', () => {
    const sendRGTestResult = jest.fn();
    const rendered = mount(
      <ResponsibleGamblingTest {...props} sendRGTestResult={sendRGTestResult} />
    );

    R.times(() => {
      rendered
        .find({ "data-test-id": "buttonNo" })
        .find("ButtonSecondary")
        .simulate("click");
    }, numberOfQuestions);
    expect(sendRGTestResult).toHaveBeenCalledWith(true);
  });

  test('giving answer "yes" to one question causes user to fail test', () => {
    const sendRGTestResult = jest.fn();
    const rendered = mount(
      <ResponsibleGamblingTest {...props} sendRGTestResult={sendRGTestResult} />
    );
    const randomYes = Math.round(Math.random() * (numberOfQuestions - 1));
    R.times(i => {
      rendered
        .find({ "data-test-id": i === randomYes ? "buttonYes" : "buttonNo" })
        .find(i === randomYes ? "ButtonPrimary" : "ButtonSecondary")
        .simulate("click");
    }, numberOfQuestions);
    expect(sendRGTestResult).toHaveBeenCalledWith(false);
  });

  test('giving answer "yes" to at least one causes user to fail test', () => {
    const sendRGTestResult = jest.fn();
    const rendered = mount(
      <ResponsibleGamblingTest {...props} sendRGTestResult={sendRGTestResult} />
    );
    R.times(i => {
      const testID =
        i === 1 || Math.round(Math.random()) === 1 ? "buttonYes" : "buttonNo";
      rendered
        .find({ "data-test-id": testID })
        .find("Button")
        .simulate("click");
    }, numberOfQuestions);
    expect(sendRGTestResult).toHaveBeenCalledWith(false);
  });

  test('giving answer "yes" to all questions causes user to fail test', () => {
    const sendRGTestResult = jest.fn();
    const rendered = mount(
      <ResponsibleGamblingTest {...props} sendRGTestResult={sendRGTestResult} />
    );
    R.times(() => {
      rendered
        .find({ "data-test-id": "buttonYes" })
        .find("Button")
        .simulate("click");
    }, numberOfQuestions);
    expect(sendRGTestResult).toHaveBeenCalledWith(false);
  });
});
