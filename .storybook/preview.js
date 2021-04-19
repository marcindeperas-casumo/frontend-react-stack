import React from "react";
import "../src/styles/index.scss";
import "./stories.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const globalDecorator = Story => (
  <>
    <div id="portal-host-element" />
    <div className="o-wrapper u-padding">
      <Story />
    </div>
  </>
);

export const decorators = [
  (Story, anotherProp, other) => {
    if (Story.parameters?.noGlobalDecorator) {
      return <Story />;
    }

    return globalDecorator(Story);
  },
];
