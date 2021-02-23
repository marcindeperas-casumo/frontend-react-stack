// @flow
import {
  parseTableOfContents,
  groupSections,
  createVersionDateFormatter,
  createVersionFormatter,
  parseChangelog,
} from "./termsAndConditions.utils";
import cms, { content as originalContent } from "./__mocks__/cms";

const numberOfSectionHeaders = 18; // based on originalContent

describe("RSModal/T&C/parseTableOfContents", () => {
  const { content, tableOfContents } = parseTableOfContents(originalContent);

  test("tableOfContents should contain all sections headers", () => {
    expect(tableOfContents).toHaveLength(numberOfSectionHeaders);
  });

  test("content should be different than original", () => {
    // it's different because p1 classes were replaced with other classes
    expect(content).not.toEqual(originalContent);
  });

  test("content doesn't contain p1 classes", () => {
    // $FlowIgnoreError: we can assume that we always have body element
    document.body.innerHTML = content;
    expect(document.querySelectorAll(".p1")).toHaveLength(0);
  });

  test("content contains u-font classes", () => {
    // $FlowIgnoreError: we can assume that we always have body element
    document.body.innerHTML = content;
    expect(document.querySelectorAll(".u-font")).toHaveLength(
      numberOfSectionHeaders
    );
  });
});

describe("RSModal/T&C/groupSections", () => {
  test("grouped content should contain as many groups as sections headers", () => {
    const groupedContent = groupSections(originalContent);
    // $FlowIgnoreError: we can assume that we always have body element
    document.body.innerHTML = groupedContent;
    expect(document.body?.childElementCount).toEqual(numberOfSectionHeaders);
  });
});

const firstVersion = 15;
const lastVersion = 17;
const acks = {
  first: {
    version: firstVersion,
    timestamp: new Date("2019-01-01T06:06:06").valueOf(),
  },
  last: {
    version: lastVersion,
    timestamp: new Date("2019-06-01T07:07:07").valueOf(),
  },
};

describe("RSModal/T&C/createVersionDateFormatter", () => {
  const formatVersionDate = createVersionDateFormatter({
    t: cms,
    acks,
    locale: "en-GB",
  });

  test("should format as agreed on registration", () => {
    expect(formatVersionDate(firstVersion, "2018-01-01")).toMatch(
      new RegExp("Agreed on registration")
    );
  });

  test("should format as published", () => {
    expect(formatVersionDate(16, "2019-06-06")).toMatch(
      new RegExp("Published")
    );
  });
});

describe("RSModal/T&C/createVersionFormatter", () => {
  const formatVersion = createVersionFormatter({
    t: cms,
    acks,
  });

  test("should format as original version", () => {
    expect(formatVersion(firstVersion, "2.5")).toEqual(
      "Version 2.5 - Original"
    );
  });

  test("should format as normal version", () => {
    expect(formatVersion(16, "2.6")).toEqual("Version 2.6");
  });

  test("should format as current version", () => {
    expect(formatVersion(lastVersion, "2.7")).toEqual("Version 2.7 - Current");
  });
});

describe("RSModal/T&C/parseChangelog", () => {
  test("should have array containing 4 objects", () => {
    const changelog = `1.3 We're not sure what changed here
1.1 Lorem ipsum dolor sit amet, consectetur adipiscing elit
1.2 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
2.13 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    expect(parseChangelog(changelog)).toHaveLength(4);
  });

  test("should skip lines that doesn't contain section number in the beginning", () => {
    const changelog = `1.3 We're not sure what changed here
Lorem ipsum dolor sit amet, consectetur adipiscing elit
1.2 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
2.13 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    expect(parseChangelog(changelog)).toHaveLength(3);
  });
});
