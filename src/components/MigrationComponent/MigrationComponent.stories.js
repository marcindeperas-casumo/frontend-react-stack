import React from "react";
import { storiesOf } from "@storybook/react";
import MigrationComponent from "./MigrationComponent";

storiesOf("MigrationComponent", module)
  .add("Default", () => <MigrationComponent />)
  .add("With a twist! 👀", () => <MigrationComponent />);
