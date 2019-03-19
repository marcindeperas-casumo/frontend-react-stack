import { assocPath } from "ramda";
import {
  LAUNCH_KAMBI_MUTATION,
  LAUNCHABLE_KAMBI_CLIENT_QUERY,
} from "../LaunchableKambiClient";

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
      betslipVisible: true,
    },
  },
};

export const mocks = [launchKambiMutationMock, launchableKambiClientQueryMock];

export const loadingMocks = [
  assocPath(["result", "loading"], true, launchKambiMutationMock),
  launchableKambiClientQueryMock,
];

export const errorMocks = [
  assocPath(["result", "error"], true, launchKambiMutationMock),
  launchableKambiClientQueryMock,
];
