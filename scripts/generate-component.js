#! /usr/bin/env node

/**
 * Usage:
 *  "$ yarn generate-component <component-name>" ==> run it
 *
 * Component Layout:
 *
 *     <component-name>/
 *         +- <component-name>.js
 *         +- <component-name>.test.js
 *         +- <component-name>.stories.js
 *         +- index.js
 *
 * Examples:
 * - "$ yarn generate-component Foo" -> generates component in folder "./Foo"
 */

const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

const COMPONENT_PATH = process.argv[2] ? path.resolve(process.argv[2]) : cwd;
const COMPONENT_NAME = process.argv[3] || "";
const COMPONENT_DIR = path.join(COMPONENT_PATH, capitalize(COMPONENT_NAME));
const FILE_TEMPLATES = {
  "index.js": '// @flow\nexport { default } from "./{{ componentName }}";\n',
  "{{ componentName }}.js": getComponentTemplate(),
  "{{ componentName }}.test.js": getComponentTestTemplate(),
  "{{ componentName }}.stories.js": getComponentStoryTemplate(),
};

checkUsage();
log("Generating component...");
createDirectory();
createFiles(FILE_TEMPLATES);
log("Component generated successfully.");

function checkUsage() {
  if (!COMPONENT_NAME) {
    log("MISSING COMPONENT-NAME\n");
    log("Usage: $ generate-component <component-name> <path>");
    process.exit(1);
  }

  if (fs.existsSync(COMPONENT_DIR)) {
    log("ALREADY_EXISTS\n");
    log(
      `Component "${capitalize(
        COMPONENT_NAME
      )}" already exists at "${COMPONENT_PATH}"`
    );
    process.exit(1);
  }
}

function log(message) {
  console.log(message);
}

function createDirectory() {
  fs.mkdirSync(COMPONENT_DIR);
}

function createFiles(templates) {
  Object.keys(templates).forEach(filename =>
    createFile(filename, templates[filename])
  );
}

function createFile(filename, template) {
  const compiledFilename = filename.replace(
    /{{ componentName }}/gim,
    capitalize(COMPONENT_NAME)
  );
  const filePath = path.join(COMPONENT_DIR, compiledFilename);
  /* eslint-disable fp/no-mutation */
  template = template.replace(
    /{{ componentName }}/gim,
    capitalize(COMPONENT_NAME)
  );
  template = template.replace(
    /{{ smallCapsComponentName }}/gim,
    COMPONENT_NAME.toLowerCase()
  );
  /* eslint-enable fp/no-mutation */
  fs.writeFileSync(filePath, template, "utf8");
}

function getComponentTemplate() {
  // eslint-disable-next-line
  return `// @flow
import React, { PureComponent } from "react";

type Props = {
  /** A descriptive comment about the 'msg' prop. Note that this will appear in storybook info addon props table. */
  msg: string,
};

class {{ componentName }} extends PureComponent<Props> {
  render() {
    const { msg } = this.props;
    return <div>{"{{ componentName }} says: " + msg}</div>;
  }
}

export default {{ componentName }};\n`;
}

function getComponentTestTemplate() {
  /* eslint-disable */
  return `import React from "react";
import { shallow } from "enzyme";
import {{ componentName }} from "Components/{{ componentName }}";

describe("{{ componentName }}", () => {
  test("should do something", () => {
    const rendered = shallow(<{{ componentName }} msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("{{ componentName }} says: hi");
    expect(1).toBe(2);
  });
});\n`;
}
/* eslint-enable */

function getComponentStoryTemplate() {
  return `// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import {{ componentName }} from "./";

const stories = storiesOf("{{ componentName }}", module);

stories.add(
  "Default",
  () => (
    <{{ componentName }} msg="howdy! 🤠" />
  ),
  info({ text: "Default" })
);\n`;
}

function capitalize(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
