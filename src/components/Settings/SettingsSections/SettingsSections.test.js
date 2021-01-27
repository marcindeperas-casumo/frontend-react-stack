import React from "react";
import { mount } from "enzyme";
import { labels } from "./__mocks__/Queries.mock";
import { SettingsSections } from "./SettingsSections";

const ONE_MINUTE_AGO = Date.now() - 60 * 1000;
const TWO_MINUTES_AGO = Date.now() - 120 * 1000;

const props = {
  playerLoginHistory: {
    player: {
      loginHistory: [
        {
          loginTime: ONE_MINUTE_AGO,
        },
        {
          loginTime: TWO_MINUTES_AGO,
        },
      ],
    },
  },
  labels: {
    ...labels,
  },
};

describe("SettingsSections", () => {
  describe("Account details section", () => {
    it("should render with correct labels", () => {
      const rendered = mount(
        <SettingsSections
          playerLoginHistory={props.playerLoginHistory}
          labels={props.labels}
        />
      );

      expect(rendered.contains(labels.account_details_title)).toBe(true);
      expect(rendered.contains(labels.account_details_description)).toBe(true);
    });
  });

  describe("Notifications section", () => {
    it("should render with correct labels", () => {
      const rendered = mount(
        <SettingsSections
          playerLoginHistory={props.playerLoginHistory}
          labels={props.labels}
        />
      );

      expect(rendered.contains(labels.notifications_title)).toBe(true);
      expect(rendered.contains(labels.account_details_description)).toBe(true);
    });
  });

  describe("Last login bar", () => {
    it("should not render", () => {
      const rendered = mount(
        <SettingsSections
          playerLoginHistory={{ player: { loginHistory: [] } }}
          labels={props.labels}
        />
      );

      expect(rendered.find("SettingsSectionsLastLogin").exists()).toBe(false);
    });

    it("should display correct current session label", () => {
      const rendered = mount(
        <SettingsSections
          playerLoginHistory={props.playerLoginHistory}
          labels={props.labels}
        />
      );

      const LastLoginBar = rendered.find("SettingsSectionsLastLogin");
      expect(LastLoginBar.contains(props.labels.current_session_length)).toBe(
        true
      );
    });

    it("should pass correct time to Timer", () => {
      const rendered = mount(
        <SettingsSections
          playerLoginHistory={props.playerLoginHistory}
          labels={props.labels}
        />
      );
      const Timer = rendered.find("Timer");
      expect(Timer.prop("startTime")).toEqual(ONE_MINUTE_AGO);
    });

    it("should interpolate and display last session message", () => {
      const rendered = mount(
        <SettingsSections
          playerLoginHistory={props.playerLoginHistory}
          labels={props.labels}
        />
      );
      expect(rendered.find("ContentReplacer").prop("value")).toEqual(
        props.labels.last_session_message
      );
    });
  });
});
