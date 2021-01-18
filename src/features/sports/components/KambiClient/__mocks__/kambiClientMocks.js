import { assocPath } from "ramda";
import { SESSION_TOUCH, LAUNCH_KAMBI_MUTATION } from "Models/apollo/mutations";
import { LAUNCHABLE_KAMBI_CLIENT_QUERY } from "Models/apollo/queries";

const launchKambiMutationMock = {
  request: {
    query: LAUNCH_KAMBI_MUTATION,
    variables: {},
  },
  result: {
    data: {
      launchKambi: {
        clientBootstrapUrl: "some url",
        providerPlayerId: "some player id",
        ticket: "some ticket",
      },
    },
  },
};

const launchableKambiClientQueryMock = {
  request: {
    query: LAUNCHABLE_KAMBI_CLIENT_QUERY,
    variables: {},
  },
  result: {
    data: {
      userHomepage: "some homepage",
      kambiClientVisible: true,
      isBetslipVisible: true,
    },
  },
};

const sessionTouchMutationMock = {
  request: {
    query: SESSION_TOUCH,
    variables: {},
  },
  result: {
    data: {
      sessionTouch: true,
    },
  },
};

export const loadingMocks = [
  assocPath(["result", "data"], false, launchKambiMutationMock),
  launchableKambiClientQueryMock,
  sessionTouchMutationMock,
];

export const errorMocks = [
  assocPath(["error"], true, launchKambiMutationMock),
  launchableKambiClientQueryMock,
  sessionTouchMutationMock,
];
