// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { SettingsNotificationsToggleRow as ToggleRow } from "Components/Settings/SettingsNotifications/SettingsNotificationsToggleRow";
import { SettingsRealityCheck } from "./SettingsRealityCheck";
import { labels } from "./__mocks__/Queries.mock";

describe("SettingsRealityCheck", () => {
  it("should not render toggle", () => {
    const rendered = shallow(
      <SettingsRealityCheck
        canToggleInterval={false}
        labels={labels}
        interval={60}
        isLoading={false}
      />
    );
    expect(rendered.find(ToggleRow)).toHaveLength(0);
  });

  it("should render toggle", () => {
    const rendered = shallow(
      <SettingsRealityCheck
        canToggleInterval={true}
        labels={labels}
        interval={60}
        isLoading={false}
      />
    );
    expect(rendered.find(ToggleRow)).toHaveLength(1);
  });
});
