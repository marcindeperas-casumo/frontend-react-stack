/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import SearchInput from "Components/SearchInput";

const stories = storiesOf("SearchInput", module);

stories.add("With Input", () => (
  <div
    className="t-background-grey-dark-1 u-padding"
    style={{ width: "420px" }}
  >
    <SearchInput
      value="Search text"
      placeholder="Type to search"
      onClear={action("search input cleared")}
      onChange={action("search input changed")}
      onFocus={action("search input focused")}
    />
  </div>
));

stories.add("Without Input", () => (
  <div
    className="t-background-grey-dark-1 u-padding"
    style={{ width: "420px" }}
  >
    <SearchInput
      value={null}
      placeholder="Type to search"
      onClear={action("search input cleared")}
      onChange={action("search input changed")}
      onFocus={action("search input focused")}
    />
  </div>
));
