import { prop, compose, defaultTo } from "ramda";
import jackpotsUpdatesSaga from "./jackpots.updates.saga";
import jackpotEntityMock from "./__mocks__/jackpots.state.mock";
import cometdResponseMock from "./__mocks__/jackpots.cometd.response.mock";

describe("Reducers/Jackpots/UpdateSaga", () => {
  const action = { data: cometdResponseMock };
  const currency = "GBP";
  const generator = jackpotsUpdatesSaga(action);
  const isGeneratorDone = (...args) => generator.next(...args).done;

  test("fires an action to update the jackpot entity", () => {
    generator.next();
    generator.next(currency);

    const effect = generator.next(jackpotEntityMock);
    const updatedJackpots = compose(
      defaultTo({}),
      prop("jackpot"),
      prop("payload"),
      prop("action"),
      prop("PUT"),
      prop("value")
    )(effect);

    shouldUpdatedJackpot({ id: "netent-gof_mega", updatedJackpots, currency });
    shouldUpdatedJackpot({
      id: "netent-megafortunedreams_mega",
      updatedJackpots,
      currency,
    });
  });

  test("finishes after updating", () => {
    expect(isGeneratorDone()).toBe(true);
  });
});

function shouldUpdatedJackpot({ id, updatedJackpots, currency }) {
  const updatedJackpot = updatedJackpots[id];
  const rawJackpotObject = cometdResponseMock[currency].find(
    ({ jackpotId }) => jackpotId === id
  );
  expect(updatedJackpot.formattedJackpotAmount).toBe(
    rawJackpotObject.formattedJackpotAmount
  );
}
