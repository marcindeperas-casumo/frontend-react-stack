import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as React from "react";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsFormIntro } from "./TimeLimitsFormIntro";

export default {
  component: TimeLimitsFormIntro,
} as ComponentMeta<typeof TimeLimitsFormIntro>;

export const Default: ComponentStory<typeof TimeLimitsFormIntro> = () => (
  <TimeLimitsFormIntro t={cmsMock} onClickCta={() => {}} />
);
