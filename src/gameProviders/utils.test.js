//@flow
import { expandElementHeightToMatchItsParent, appendLobbyUrl } from "./utils";

describe("Game providers utils", () => {
  test("should set iframe size to fits it's parent size", () => {
    const gameRef = {
      current: (document.createElement("iframe"): HTMLIFrameElement),
    };

    expandElementHeightToMatchItsParent(gameRef);

    //expecting 0px as unmounted element will always have 0 width/height
    expect(gameRef.current.style.height).toEqual("0px");
    expect(gameRef.current.style.width).toEqual("0px");
  });
});

// Used by gameProvider files to encode lobbyUrl
describe("Game url params", () => {
  test("should append lobby url", () => {
    const gameUrl =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen?Pbcq%2346&applicationid=4123&serverid=23613";
    const lobbyUrl =
      "https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";
    const returnedAppendedLobbyUrl = appendLobbyUrl({
      url: gameUrl,
      paramsToAdd: [{ key: "lobbyUrl", value: lobbyUrl }],
    });

    const comparisonURL =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen%3FPbcq%2346&applicationid=4123&serverid=23613&lobbyUrl=https%253A%252F%252Fmobile.dev%252Fgamelaunchers%252Fnavigation-bubbler.html%253Ftarget%253Den%252Fgames%252Ftop";

    expect(returnedAppendedLobbyUrl).toMatch(comparisonURL);
  });

  test("should append multiple url params", () => {
    const gameUrl =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen?Pbcq%2346&applicationid=4123&serverid=23613";
    const lobbyUrl =
      "https%3A%2F%2Fmobile.dev%2Fgamelaunchers%2Fnavigation-bubbler.html%3Ftarget%3Den%2Fgames%2Ftop";
    const secondUrlParam = "test";
    const returnedAppendedLobbyUrl = appendLobbyUrl({
      url: gameUrl,
      paramsToAdd: [
        { key: "lobbyUrl", value: lobbyUrl },
        { key: "testParam", value: secondUrlParam },
      ],
    });

    const comparisonURL =
      "https://redirector32.valueactive.eu/Casino/Default.aspx?playmode=real&gameid=108heroesDesktop&showva=help&ul=en&authtoken=bNENEQlhHOVJEQkhCQzk3TUs%3DSen%3FPbcq%2346&applicationid=4123&serverid=23613&lobbyUrl=https%253A%252F%252Fmobile.dev%252Fgamelaunchers%252Fnavigation-bubbler.html%253Ftarget%253Den%252Fgames%252Ftop&testParam=test";

    expect(returnedAppendedLobbyUrl).toMatch(comparisonURL);
  });
});
