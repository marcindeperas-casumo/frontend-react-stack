import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProgressWithSteps } from "./ProgressWithSteps";

export default {
  component: ProgressWithSteps,
} as ComponentMeta<typeof ProgressWithSteps>;

export const Empty: ComponentStory<typeof ProgressWithSteps> = () => (
  <ProgressWithSteps steps={[]} />
);

export const Default: ComponentStory<typeof ProgressWithSteps> = () => (
  <ProgressWithSteps
    steps={[
      { label: "1", isActive: true },
      { label: "2", isActive: true },
      { label: "3", isActive: false },
    ]}
  />
);
