import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import React from "react";
import ExpandableListItem from "./ExpandableListItem";

const stories = storiesOf("Sports/ExpandableListItem", module);

const testContent = index => (
  <div style={{ backgroundColor: "grey", height: index % 2 !== 0 ? 100 : 200 }}>
    Test content {index}
  </div>
);

const testLabel = index =>
  index % 3 !== 0 ? (
    `Text label ${index}`
  ) : (
    <div style={{ height: 50, backgroundColor: "tomato" }}>
      Node label {index}
    </div>
  );

stories.add("Single item", () => (
  <ExpandableListItem label="Single Item">{testContent(0)}</ExpandableListItem>
));

stories.add("Multiple items", () => {
  const numberOfListItems = number("Number of List Items", 5, {
    range: true,
    min: 1,
    max: 6,
    step: 1,
  });

  const iterable = new Array(numberOfListItems).fill({});
  return (
    <>
      {iterable.map((_, index) => (
        <ExpandableListItem key={index} label={testLabel(index)}>
          {testContent(index)}
        </ExpandableListItem>
      ))}
    </>
  );
});
