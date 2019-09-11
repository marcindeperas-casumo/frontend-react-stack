import React from "react";
import { shallow } from "enzyme";
import { BettingGlossaryEntry, highlightedClass } from "./BettingGlossaryEntry";

const createMockEvent = returnValue => ({
  currentTarget: {
    querySelector: () => returnValue,
  },
});

const baseProps = {
  id: "123",
  term: "Term",
  aka: "Terminator",
  definition: "Some text here.",
};

describe("<BettingGlossaryEntry />", () => {
  test("should not render also known as when the CMS has an 'empty' value", () => {
    const props = { ...baseProps, aka: "empty" };
    const rendered = shallow(<BettingGlossaryEntry {...props} />);
    const aka = rendered.find("[data-test-glossary-entry-aka]");

    expect(aka).toHaveLength(0);
  });

  test("should render also known as when the CMS has a non-'empty' value", () => {
    const rendered = shallow(<BettingGlossaryEntry {...baseProps} />);
    const aka = rendered.find("[data-test-glossary-entry-aka]");

    expect(aka).toHaveLength(1);
  });
});

describe("handleLinkedEntries", () => {
  let rendered, instance;

  beforeEach(() => {
    rendered = shallow(<BettingGlossaryEntry {...baseProps} />);
    instance = rendered.instance();
    jest.spyOn(instance, "scrollToTerm").mockImplementation(() => {});
  });

  afterEach(jest.resetAllMocks);

  test("should call scrollToTerm if there is a linked entry", () => {
    const mockElem = { getAttribute: () => "mock-term" };
    const mockEvent = createMockEvent(mockElem);

    jest.spyOn(document, "querySelector").mockImplementation(() => mockElem);

    rendered.instance();
    instance.handleLinkedEntries(mockEvent);

    expect(instance.scrollToTerm).toHaveBeenCalledTimes(1);
    expect(instance.scrollToTerm).toHaveBeenCalledWith(mockElem);
  });

  test("should not call scrollToTerm if there is no linked entry", () => {
    const mockEvent = createMockEvent(null);

    instance.handleLinkedEntries(mockEvent);

    expect(instance.scrollToTerm).toHaveBeenCalledTimes(0);
  });
});

describe("scrollToTerm", () => {
  let rendered, instance;

  const mockElem = { classList: { remove: jest.fn() } };
  const elem = document.createElement("div");
  elem.scrollTo = jest.fn();
  elem.classList.add = jest.fn();

  beforeEach(() => {
    rendered = shallow(<BettingGlossaryEntry {...baseProps} />);
    instance = rendered.instance();

    jest.spyOn(instance, "scrollToTerm");

    jest.spyOn(document, "documentElement", "get").mockImplementation(() => ({
      style: {
        getPropertyValue: jest.fn(),
      },
    }));

    jest
      .spyOn(window.document, "querySelectorAll")
      .mockImplementation(() => [mockElem, mockElem, mockElem]);

    jest.spyOn(window.document, "querySelector").mockImplementation(() => elem);
  });

  afterEach(jest.resetAllMocks);

  test("should remove the highlight class from any existing nodes with this class", () => {
    elem.scrollTo = jest.fn();

    instance.scrollToTerm(elem);

    expect(mockElem.classList.remove).toHaveBeenCalledTimes(3);
  });

  test("should add the highlight class to the linked term", () => {
    instance.scrollToTerm(elem);

    expect(elem.classList.add).toHaveBeenCalledTimes(1);
    expect(elem.classList.add).toHaveBeenCalledWith(highlightedClass);
  });

  test("should call scrollTo if there is a modal content available", () => {
    instance.scrollToTerm(elem);
    const xOffset = 0;
    const yOffset = -309;

    expect(elem.scrollTo).toHaveBeenCalledTimes(1);
    expect(elem.scrollTo).toHaveBeenCalledWith(xOffset, yOffset);
  });
});
