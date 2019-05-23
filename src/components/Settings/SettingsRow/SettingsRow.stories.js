// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Link from "Components/Settings/Link";
import { SettingsRow } from "./SettingsRow";

const stories = storiesOf("Settings/SettingsRow", module);

stories.add("Default", () => <SettingsRow text="a label" />);
