import { ENVIRONMENTS, DEFAULT_LANGUAGE, LANGUAGES } from "Src/constants";
import { BaseGame } from "./BaseGame";

describe("BaseGame", () => {
  const gameData = {
    url:
      "https://d1k6j4zyghhevb.cloudfront.net/casino/launch&partnerid=11&moneymode=fun&lang=en___&login=demo",
    providerType: "RELAX_HTML5",
    providerName: "RELAX",
  };
  const gameRef = { current: null };
  const model = new BaseGame({
    gameData,
    gameRef,
    language: DEFAULT_LANGUAGE,
    environment: ENVIRONMENTS.TEST,
    urlPrefix: DEFAULT_LANGUAGE,
    origin: window.location.origin,
  });

  test("should set gameData params and gameRef in constructor", () => {
    expect(model.props.gameData).toEqual(gameData);
    expect(model.props.gameRef).toEqual(gameRef);
  });

  test("should return the element as div", () => {
    expect(model.componentTag).toBe("div");
  });

  test("should return componentProps with gameRef", () => {
    expect(model.componentProps).toEqual({ ref: { current: null } });
  });

  test("should return lobbyUrl", () => {
    expect(model.lobbyUrl).toBe(
      "http://localhost/gamelaunchers/navigation-bubbler.html?target=en/games"
    );
  });

  test("should not have market prefix in the lobby url when run on TLD specific markets", () => {
    const esLang = LANGUAGES.es_es;
    const origin = "casumo.es";

    const esModel = new BaseGame({
      gameData,
      gameRef,
      language: esLang,
      environment: ENVIRONMENTS.TEST,
      urlPrefix: esLang,
      origin,
    });

    expect(esModel.lobbyUrl).toBe(
      `${origin}/gamelaunchers/navigation-bubbler.html?target=games`
    );
  });
});
