import { put, call, select } from "redux-saga/effects";
import { marketSelector, playerIdSelector } from "Models/handshake";
import { waitForSelector } from "Utils";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { danishOverlaySaga } from "./danishOverlay.saga";

describe("danish overlay saga", () => {
  test("initialize check for non DK market", () => {
    const generator = danishOverlaySaga();

    expect(generator.next().value).toEqual(
      call(waitForSelector, playerIdSelector)
    );
    expect(generator.next().value).toEqual(
      call(waitForSelector, marketSelector)
    );

    expect(generator.next().value).toEqual(select(playerIdSelector));
    expect(generator.next().value).toEqual(select(marketSelector));

    expect(generator.next("gb_uk").done).toEqual(true);
  });

  test("should dispatch action to show overlay if player is DK and doesn't have deposit limit set", () => {
    const generator = danishOverlaySaga();

    expect(generator.next().value).toEqual(
      call(waitForSelector, playerIdSelector)
    );
    expect(generator.next().value).toEqual(
      call(waitForSelector, marketSelector)
    );

    expect(generator.next().value).toEqual(select(playerIdSelector));
    expect(generator.next().value).toEqual(select(marketSelector));

    generator.next("dk_da");

    generator.next();

    const response = {
      moneyLimits: [],
    };

    const modalConfig = {
      mustAccept: true,
    };

    expect(generator.next({ response }).value).toEqual(
      put(showModal(REACT_APP_MODAL.ID.DANISH_ENTRY_OVERLAY, modalConfig))
    );

    expect(generator.next().done).toEqual(true);
  });
});
