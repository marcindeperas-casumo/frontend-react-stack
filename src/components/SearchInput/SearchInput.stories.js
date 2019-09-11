/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs/react";
import SearchInput from "Components/SearchInput";

const stories = storiesOf("SearchInput", module);

const Wrapper = ({ children }) => (
  <div className="story t-background-chrome-light-1 u-padding--2xlg">
    {children}
  </div>
);

const props = {
  value: "Search text",
  placeholder: "Type to search",
  onClear: action("search input cleared"),
  onChange: action("search input changed"),
  onFocus: action("search input focused"),
};

stories.add("With Input", () => (
  <Wrapper>
    <SearchInput {...props} value={text("query", props.value)} />
  </Wrapper>
));

stories.add("With Input (focused)", () => (
  <Wrapper>
    <SearchInput {...props} autofocus />
  </Wrapper>
));

stories.add("Without Input", () => (
  <Wrapper>
    <SearchInput {...props} value={null} />
  </Wrapper>
));

stories.add("Without Input (focused)", () => (
  <Wrapper>
    <SearchInput {...props} value={null} autofocus />
  </Wrapper>
));
