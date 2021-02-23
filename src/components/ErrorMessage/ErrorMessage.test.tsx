// @flow
import React from "react";
import { shallow } from "enzyme";
import { ErrorMessage } from "Components/ErrorMessage";

const ERROR_MESSAGE = "Loading failed";

const findElements = container => ({
  flexContainer: container.find("[data-test='error-message-container']"),
  sumo: container.find("[data-test='error-message-sumo']"),
  errorMessage: container.find("[data-test='error-message-error-message']"),
  retryButton: container.find("[data-test='error-message-retry-button']"),
});

describe("ErrorMessage", () => {
  describe("when given no props", () => {
    test("should render with defaults", () => {
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
      const rendered = shallow(<ErrorMessage />);
      const elements = findElements(rendered);

      expect(elements.flexContainer.prop("direction")).toBe("vertical");
      expect(elements.sumo.length).toBe(1);
      expect(elements.errorMessage.prop("children")).toBe(ERROR_MESSAGE);
      expect(elements.retryButton.length).toBe(0);
    });
  });

  describe("when given the direction prop 'vertical'", () => {
    test("should render vertically", () => {
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ direction: "vertical"; }' is missing the f... Remove this comment to see the full error message
      const rendered = shallow(<ErrorMessage direction="vertical" />);
      const elements = findElements(rendered);

      expect(elements.flexContainer.prop("direction")).toBe("vertical");
      expect(elements.sumo.length).toBe(1);
      expect(elements.errorMessage.prop("children")).toBe(ERROR_MESSAGE);
      expect(elements.retryButton.length).toBe(0);
    });
  });

  describe("when given the direction prop 'horizontal'", () => {
    test("should render horizontally", () => {
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ direction: "horizontal"; }' is missing the... Remove this comment to see the full error message
      const rendered = shallow(<ErrorMessage direction="horizontal" />);
      const elements = findElements(rendered);

      expect(elements.flexContainer.prop("direction")).toBe("horizontal");
      expect(elements.sumo.length).toBe(1);
      expect(elements.errorMessage.prop("children")).toBe(ERROR_MESSAGE);
      expect(elements.retryButton.length).toBe(0);
    });
  });

  describe("when given an error message", () => {
    test("should render the custom error message", () => {
      const errorMessage = "Loading === exploding";
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ errorMessage: string; }' is missing the fo... Remove this comment to see the full error message
      const rendered = shallow(<ErrorMessage {...{ errorMessage }} />);
      const elements = findElements(rendered);

      expect(elements.flexContainer.prop("direction")).toBe("vertical");
      expect(elements.sumo.length).toBe(1);
      expect(elements.errorMessage.prop("children")).toBe(errorMessage);
      expect(elements.retryButton.length).toBe(0);
    });
  });

  describe("when given a retry callback", () => {
    test("should render the retry button, with default text", () => {
      const retry = jest.fn();
      const rendered = shallow(
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'retryMessage' is missing in type '{ retr... Remove this comment to see the full error message
        <ErrorMessage direction="vertical" {...{ retry }} />
      );
      const elements = findElements(rendered);

      expect(elements.flexContainer.prop("direction")).toBe("vertical");
      expect(elements.sumo.length).toBe(1);
      expect(elements.errorMessage.prop("children")).toBe(ERROR_MESSAGE);
      expect(elements.retryButton.prop("children")).toBe("Try again");
      expect(elements.retryButton.length).toBe(1);
    });
  });

  describe("when given a retry callback and an retry message", () => {
    test("should render the custom error message", () => {
      const retry = jest.fn();
      const retryMessage = "Try again, before I cry again";
      const rendered = shallow(
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'errorMessage' is missing in type '{ retr... Remove this comment to see the full error message
        <ErrorMessage direction="vertical" {...{ retry, retryMessage }} />
      );
      const elements = findElements(rendered);

      expect(elements.flexContainer.prop("direction")).toBe("vertical");
      expect(elements.sumo.length).toBe(1);
      expect(elements.errorMessage.prop("children")).toBe(ERROR_MESSAGE);
      expect(elements.retryButton.prop("children")).toBe(retryMessage);
      expect(elements.retryButton.length).toBe(1);
    });
  });
});
