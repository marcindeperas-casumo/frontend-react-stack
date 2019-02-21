// @flow
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";

import * as kambi from "Features/sports/kambi";

import * as queries from "./queries";
import * as mutations from "./mutations";

import resolvers from "./resolvers";

const widgetApiMock = {
  set: jest.fn(),
  navigateClient: jest.fn(),
  BETSLIP_SHOW: "BETSLIP_SHOW",
  BETSLIP_HIDE: "BETSLIP_HIDE",
  BETSLIP_MAXIMIZED: "BETSLIP_MAXIMIZED",
};

jest.mock("../../kambi");

const mock = (mockFn: any) => mockFn;

const createClientWithState = (state: {
  [string]: mixed,
}): ApolloClient<InMemoryCache> => {
  const cache = new InMemoryCache();

  const link = withClientState({
    resolvers,
    defaults: state,
    cache,
  });

  return new ApolloClient({
    link,
    cache,
  });
};

describe("Client state resolvers", () => {
  describe("Mutation.openModal", () => {
    test("appends the modal to the list of active modals", async () => {
      const modal1: Modal = "CHOOSE_FAVOURITES";
      const modal2: Modal = "CHOOSE_FAVOURITE_COMPETITIONS";

      const client = createClientWithState({
        activeModals: [],
        betslipVisible: false,
      });

      await client.mutate({
        mutation: mutations.OPEN_MODAL_MUTATION,
        variables: {
          modal: modal1,
        },
      });
      const result1 = await client.query({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(result1.data.activeModals).toEqual([modal1]);

      await client.mutate({
        mutation: mutations.OPEN_MODAL_MUTATION,
        variables: {
          modal: modal2,
        },
      });
      const result2 = await client.query({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(result2.data.activeModals).toEqual([modal1, modal2]);
    });

    test("sets betslip visibility to be false when modal is opened", async () => {
      const client = createClientWithState({
        activeModals: [],
        betslipVisible: true,
      });

      await client.mutate({
        mutation: mutations.OPEN_MODAL_MUTATION,
        modal: "SOMETHING",
      });

      const result = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });
      expect(result.data.betslipVisible).toBe(false);
    });
  });

  describe("Mutation.closeModal", () => {
    test("removes the modal from the list of active modals", async () => {
      const modal1: Modal = "CHOOSE_FAVOURITES";
      const modal2: Modal = "CHOOSE_FAVOURITE_COMPETITIONS";
      const client = createClientWithState({
        activeModals: [modal1, modal2],
        betslipVisible: false,
      });

      await client.mutate({
        mutation: mutations.CLOSE_MODAL_MUTATION,
        variables: {
          modal: modal1,
        },
      });
      const result1 = await client.query({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(result1.data.activeModals).toEqual([modal2]);

      await client.mutate({
        mutation: mutations.CLOSE_MODAL_MUTATION,
        variables: {
          modal: modal2,
        },
      });
      const result2 = await client.query({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(result2.data.activeModals).toEqual([]);
    });

    test("sets betslip visibility to be true when all modals are closed", async () => {
      const modal1: Modal = "CHOOSE_FAVOURITES";
      const modal2: Modal = "CHOOSE_FAVOURITE_COMPETITIONS";
      const client = createClientWithState({
        activeModals: [modal1, modal2],
        betslipVisible: false,
      });

      await client.mutate({
        mutation: mutations.CLOSE_MODAL_MUTATION,
        variables: {
          modal: modal1,
        },
      });
      const result1 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result1.data.betslipVisible).toBe(false);

      await client.mutate({
        mutation: mutations.CLOSE_MODAL_MUTATION,
        variables: {
          modal: modal2,
        },
      });
      const result2 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result2.data.betslipVisible).toBe(true);
    });
  });

  describe("Mutation.updateBetslipState", () => {
    test("sets the betslipVisible state correctly in the cache", async () => {
      const client = createClientWithState({
        betslipVisible: true,
      });

      await client.mutate({
        mutation: mutations.UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: false },
      });

      const result1 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result1.data.betslipVisible).toBe(false);

      await client.mutate({
        mutation: mutations.UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: true },
      });

      const result2 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result2.data.betslipVisible).toBe(true);
    });
  });

  describe("Mutation.updateKambiClientState", () => {
    test("sets the kambiClientVisible state correctly in the cache", async () => {
      const client = createClientWithState({
        kambiClientVisible: true,
      });

      await client.mutate({
        mutation: mutations.UPDATE_KAMBI_CLIENT_STATE_MUTATION,
        variables: { isVisible: false },
      });

      const result1 = await client.query({
        query: queries.KAMBI_CLIENT_VISIBLE_QUERY,
      });

      expect(result1.data.kambiClientVisible).toBe(false);

      await client.mutate({
        mutation: mutations.UPDATE_KAMBI_CLIENT_STATE_MUTATION,
        variables: { isVisible: true },
      });

      const result2 = await client.query({
        query: queries.KAMBI_CLIENT_VISIBLE_QUERY,
      });

      expect(result2.data.kambiClientVisible).toBe(true);
    });
  });

  describe("Mutation.navigateClient()", () => {
    beforeEach(() => {
      jest.resetAllMocks();
      mock(kambi.getKambiWidgetAPI).mockResolvedValue(widgetApiMock);
    });

    test("calls kambiWidgetApi.navigateClient with correct params", async () => {
      const client = createClientWithState({});
      await client.mutate({
        mutation: mutations.NAVIGATE_CLIENT_MUTATION,
        variables: { path: "path", trackingLocation: "location" },
      });

      expect(widgetApiMock.navigateClient).toHaveBeenCalledWith(
        "path",
        "location"
      );
    });

    test("removes all active modals when navigating", async () => {
      const client = createClientWithState({
        activeModals: ["TESTMODAL", "TESTMODAL2"],
      });

      await client.mutate({
        mutation: mutations.NAVIGATE_CLIENT_MUTATION,
        variables: { path: "path" },
      });

      const result = await client.query({ query: queries.ACTIVE_MODALS_QUERY });

      expect(result.data.activeModals).toEqual([]);
    });
  });
});
