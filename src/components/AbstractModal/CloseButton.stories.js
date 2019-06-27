// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { CloseButton } from "./CloseButton";

const stories = storiesOf("AbstractModal/CloseButton", module);

stories.add("default", () => <CloseButton />);
