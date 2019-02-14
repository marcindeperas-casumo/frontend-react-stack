/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import SearchInput from "Components/SearchInput";

const stories = storiesOf("SearchInput", module);

const Wrapper = ({ children }) => (
  <div
    className="story t-background-grey-dark-1 u-padding"
    style={{ width: "420px" }}
  >
    {children}
  </div>
);

const FocusHelper = () => {
  const input = document.querySelector(".story input");
  if (input) {
    input.focus();
  }
  return null;
};

const props = {
  value: "Search text",
  placeholder: "Type to search",
  onClear: action("search input cleared"),
  onChange: action("search input changed"),
  onFocus: action("search input focused"),
};

stories.add("With Input", () => (
  <Wrapper>
    <SearchInput {...props} />
  </Wrapper>
));

stories.add("With Input (focused)", () => (
  <Wrapper>
    <SearchInput {...props} />
    <FocusHelper />
  </Wrapper>
));

stories.add("Without Input", () => (
  <Wrapper>
    <SearchInput {...props} value={null} />
  </Wrapper>
));

stories.add("Without Input (focused)", () => (
  <Wrapper>
    <SearchInput {...props} value={null} />
    <FocusHelper />
  </Wrapper>
));
