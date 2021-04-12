import { storiesOf } from "@storybook/react";
import React from "react";
import { CloseButton } from "./CloseButton";

const stories = storiesOf("AbstractModal/CloseButton", module);

stories.add("default", () => <CloseButton />);
