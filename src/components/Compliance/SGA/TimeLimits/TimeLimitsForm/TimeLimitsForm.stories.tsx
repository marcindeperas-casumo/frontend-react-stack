import { storiesOf } from "@storybook/react";
import * as React from "react";
import MockStore from "Components/MockStore";
import { prepareLoginTimeLimitsStateMock } from "Models/playOkay";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsForm } from "./TimeLimitsForm";

const stories = storiesOf("Compliance/SGA/TimeLimits/TimeLimitsForm", module);

stories.add("Default", () => {
  return (
    <MockStore>
      <TimeLimitsForm
        t={cmsMock}
        isFetching={false}
        onClickCta={() => {}}
        currentLoginTimeLimits={prepareLoginTimeLimitsStateMock({
          daily: true,
          weekly: true,
          monthly: true,
        })}
      />
    </MockStore>
  );
});
