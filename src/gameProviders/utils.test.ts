import { expandElementHeightToMatchItsParent, appendToGameUrl } from "./utils";

describe("Game providers utils", () => {
  test("should set iframe size to fits it's parent size", () => {
    const gameRef = {
      current: document.createElement("iframe") as HTMLIFrameElement,
    };

    expandElementHeightToMatchItsParent(gameRef);

    //expecting 0px as unmounted element will always have 0 width/height
    expect(gameRef.current.style.height).toEqual("0px");
    expect(gameRef.current.style.width).toEqual("0px");
  });
});

// Used by gameProvider files to encode lobbyUrl
describe("Game url params for Game providers", () => {
  test("should append lobby url for MicroGaming", () => {
    const gameUrl =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen?Pbcq%2346&applicationid=4123&serverid=23613";
    const lobbyUrl =
      "https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";
    const returnedAppendedLobbyUrl = appendToGameUrl({
      url: gameUrl,
      paramsToAdd: [{ key: "lobbyUrl", value: lobbyUrl }],
    });

    const comparisonURL =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen%3FPbcq%2346&applicationid=4123&serverid=23613&lobbyUrl=https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";

    expect(returnedAppendedLobbyUrl).toMatch(comparisonURL);
  });

  test("should append lobby url for Relax", () => {
    const gameUrl =
      "https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=moneytrain2&partner=casumo&ticket=7300ed64-4159-48b5-a1a6-8882fcd1a0e1&jurisdiction=MT&channel=web&partnerid=11&moneymode=real&lang=en_MT";
    const lobbyUrl =
      "https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";
    const returnedAppendedLobbyUrl = appendToGameUrl({
      url: gameUrl,
      paramsToAdd: [{ key: "lobbyUrl", value: lobbyUrl }],
    });

    const comparisonURL =
      "https://d2drhksbtcqozo.cloudfront.net/casino/launcher.html?gameid=moneytrain2&partner=casumo&ticket=7300ed64-4159-48b5-a1a6-8882fcd1a0e1&jurisdiction=MT&channel=web&partnerid=11&moneymode=real&lang=en_MT&lobbyUrl=https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";

    expect(returnedAppendedLobbyUrl).toMatch(comparisonURL);
  });

  test("should append lobby url for RedTiger", () => {
    const gameUrl =
      "https://gserver-casumo-dev.dopamine-gaming.com/casumo/launcher/GonzosQuestMegaWays?hasAutoplayLimitLoss=true&hasAutoplayStopOnBonus=true&channel=D&casino=Casumo&hasAutoplayStopOnJackpot=true&userId=VKC8F2TGWRFHGFV7K99JHQ2849RVCV2X&hasAutoplaySingleWinLimit=true&playMode=real&token=c81aa9ca-ad63-4708-b2f2-1618eb112407&hasAutoplayTotalSpins=true&currency=EUR&lang=en&hasGamble=true";
    const lobbyUrl =
      "https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";
    const returnedAppendedLobbyUrl = appendToGameUrl({
      url: gameUrl,
      paramsToAdd: [{ key: "lobbyUrl", value: lobbyUrl }],
    });

    const comparisonURL =
      "https://gserver-casumo-dev.dopamine-gaming.com/casumo/launcher/GonzosQuestMegaWays?hasAutoplayLimitLoss=true&hasAutoplayStopOnBonus=true&channel=D&casino=Casumo&hasAutoplayStopOnJackpot=true&userId=VKC8F2TGWRFHGFV7K99JHQ2849RVCV2X&hasAutoplaySingleWinLimit=true&playMode=real&token=c81aa9ca-ad63-4708-b2f2-1618eb112407&hasAutoplayTotalSpins=true&currency=EUR&lang=en&hasGamble=true&lobbyUrl=";

    expect(returnedAppendedLobbyUrl).toMatch(comparisonURL);
  });

  test("should append multiple url params", () => {
    const gameUrl =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen?Pbcq%2346&applicationid=4123&serverid=23613";
    const lobbyUrl =
      "https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";
    const secondUrlParam = "test";
    const returnedAppendedLobbyUrl = appendToGameUrl({
      url: gameUrl,
      paramsToAdd: [
        { key: "lobbyUrl", value: lobbyUrl },
        { key: "testParam", value: secondUrlParam },
      ],
    });

    const comparisonURL =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen%3FPbcq%2346&applicationid=4123&serverid=23613&lobbyUrl=https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop&testParam=test";

    expect(returnedAppendedLobbyUrl).toMatch(comparisonURL);
  });
});
