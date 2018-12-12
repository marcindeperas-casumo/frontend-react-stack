import React from "react";
import { mount } from "enzyme";
import ErrorBoundary from "./ErrorBoundary";

describe("<ErrorBoundary />", () => {
  const onError = e => {
    e.preventDefault();
  };

  // We are using the following "hack" to stop React from
  // logging to warning to the consol and thus pollute our test log output.
  // More info: https://github.com/facebook/react/issues/11098#issuecomment-412682721
  beforeEach(() => {
    window.addEventListener("error", onError);
  });

  afterEach(() => {
    window.removeEventListener("error", onError);
  });

  test("renders out the children if there are no errors", () => {
    const Component = () => <span>Foo Bar.</span>;
    const rendered = mount(
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    );

    expect(rendered.html()).toMatch("Foo Bar.");
  });

  test("does not render out anything in case of an error and if withoutUserFeedback is set", () => {
    const logError = jest.fn();
    const Component = () => {
      // eslint-disable-next-line fp/no-throw
      throw new Error("Test");
    };
    const rendered = mount(
      <ErrorBoundary logError={logError} withoutUserFeedback>
        <Component />
      </ErrorBoundary>
    );

    expect(rendered.find("ErrorBoundaryUserFeedback")).toHaveLength(0);
    expect(rendered.html()).toBeNull();
  });

  test("renders a user feedback by default in case of an error", () => {
    const logError = jest.fn();
    const Component = () => {
      // eslint-disable-next-line fp/no-throw
      throw new Error("Test");
    };
    const rendered = mount(
      <ErrorBoundary logError={logError}>
        <Component />
      </ErrorBoundary>
    );

    expect(rendered.find("ErrorBoundaryUserFeedback")).toHaveLength(1);
  });

  test("calls the logError() function if there was an error thrown in the children", () => {
    const logError = jest.fn();
    const message = "Random Error";
    const error = new Error(message);
    const Component = () => {
      // eslint-disable-next-line fp/no-throw
      throw error;
    };

    mount(
      <ErrorBoundary logError={logError}>
        <Component />
      </ErrorBoundary>
    );

    const firstArg = logError.mock.calls[0][0];
    const secondArg = logError.mock.calls[0][1];
    const thirdArg = logError.mock.calls[0][1];

    expect(logError).toHaveBeenCalledTimes(1);
    expect(firstArg).toEqual(message);
    expect(secondArg).toEqual(error);
    expect(thirdArg).toBeInstanceOf(Object);
  });
});
