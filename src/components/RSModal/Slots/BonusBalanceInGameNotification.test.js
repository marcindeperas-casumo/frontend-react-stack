// @flow
import * as React from "react";
import { shallow, mount } from "enzyme";
import { ButtonPrimary } from "@casumo/cmp-button";
import { WAGERING_NOTIFICATION_TYPES } from "Models/playing/playing.constants";
import { BonusBalanceInGameNotification } from "./BonusBalanceInGameNotification";

const bonusNotificationConfig = {
  type: WAGERING_NOTIFICATION_TYPES.BONUS_MONEY_WAGERING,
};

const realBalanceNotificationConfig = {
  type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING,
};

const props = {
  acceptModal: () => {},
  t: {
    modal_title: "Wagering notification",
    modal_text_bonus:
      "You have bonus money in your account. This bonus money can’t be withdrawn until the associated wagering requirement is fulfilled. We’ll inform you as soon as it’s completed while playing. Enjoy your session.",
    modal_text_real:
      "You have just completed the bonus wagering requirement that was associated with your bonus. Good Job!",
    cta_text: "Continue playing",
  },
};
describe("Bonus Balance Notification", () => {
  test("Modal contains CTA", () => {
    const wrapper = shallow(
      <BonusBalanceInGameNotification
        {...props}
        config={bonusNotificationConfig}
      />
    );
    expect(wrapper.find(ButtonPrimary).exists()).toBeTruthy();
  });

  test("Modal shows different message for real money balance", () => {
    const realMoneyMessage =
      "You have just completed the bonus wagering requirement that was associated with your bonus. Good Job!";
    const wrapper = mount(
      <BonusBalanceInGameNotification
        {...props}
        config={realBalanceNotificationConfig}
      />
    );
    expect(
      wrapper
        .find("p")
        .text()
        .includes(realMoneyMessage)
    ).toBe(true);
  });
});
