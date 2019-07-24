import React from "react";
import { mount } from "enzyme";
import { DateTime } from "luxon";
import { labels } from "./__mocks__/Queries.mock";
import { SettingsSections } from "./SettingsSections";

const ONE_MINUTE_AGO = Date.now() - 60 * 1000;
const props = {
  playerLoginHistory: {
    player: {
      loginHistory: [
        {
          loginTime: ONE_MINUTE_AGO,
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

      const AccountDetailsLink = rendered.find("AccountDetailsLink");
      expect(AccountDetailsLink.contains(labels.accountDetailsTitle)).toBe(
        true
      );
      expect(
        AccountDetailsLink.contains(labels.accountDetailsDescription)
      ).toBe(true);
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

      const NotificationsLink = rendered.find("NotificationsLink");
      expect(NotificationsLink.contains(labels.notificationsTitle)).toBe(true);
      expect(NotificationsLink.contains(labels.notificationsDescription)).toBe(
        true
      );
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
      expect(LastLoginBar.contains(props.labels.currentSessionMessage)).toBe(
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
      const dateObject = DateTime.fromMillis(ONE_MINUTE_AGO);
      const date = dateObject.toLocaleString(DateTime.DATE_FULL);
      const time = dateObject.toLocaleString(DateTime.TIME_24_SIMPLE);
      const lastLoginMessage = `Your last session was on <strong>${date}</strong>, at <strong>${time}</strong>`;
      expect(rendered.find("DangerousHtml").prop("html")).toEqual(
        lastLoginMessage
      );
    });
  });
});
