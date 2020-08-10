// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_MODAL_HIDDEN, REACT_APP_MODAL } from "Src/constants";
import { useRealityCheckModal } from "./useRealityCheckModal.hook";

const state = {
  player: {
    realityCheck: {
      intervalSeconds: 60,
      playerId: "5839ad10-695d-11e8-9bc7-0242ac110003",
      sessionStartedTime: 1576082415583,
      totalBetAmount: {
        amount: 0.64,
        iso4217CurrencyCode: "GBP",
      },
      totalWinAmount: {
        amount: 0.52,
        iso4217CurrencyCode: "GBP",
      },
    },
  },
};

describe("useRealityCheckModal", () => {
  const pauseGame = jest.fn(() => Promise.resolve());
  const resumeGame = jest.fn();

  mount(
    <MockStore state={state}>
      <HookWrapper
        hook={useRealityCheckModal}
        args={[{ pauseGame, resumeGame }]}
      />
    </MockStore>
  );

  describe("reality check modal should be dispached", () => {
    it("calls pauseGame", () => {
      expect(pauseGame).toBeCalledTimes(1);
    });
  });

  describe("reality check modal is accepted and calls resumeGame", () => {
    const data = {
      modalId: REACT_APP_MODAL.ID.REALITY_CHECK,
      result: class {},
      returnCode: "ACCEPTED",
      ev: "KO_APP_EVENT/modalHidden",
    };
    bridge.emit(KO_APP_EVENT_MODAL_HIDDEN, { data });

    it("calls resumeGame", () => {
      expect(resumeGame).toBeCalledTimes(1);
    });
  });
});
