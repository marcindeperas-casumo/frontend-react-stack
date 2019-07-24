// @flow
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as kambi from "Features/sports/kambi";
import * as queries from "./queries";
import * as mutations from "./mutations";
import resolvers from "./resolvers";
import defaultState from "./defaultState";

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

  const client = new ApolloClient({
    cache,
    resolvers,
  });

  cache.writeData({
    data: state,
  });

  return client;
};

const modal1: Modal = "CHOOSE_FAVOURITES";
const modal2: Modal = "CHOOSE_FAVOURITE_COMPETITIONS";

describe("Client state resolvers", () => {
  describe("Default state", () => {
    test("Betslip should be visible by default", async () => {
      const client = createClientWithState(defaultState);

      const result = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result.data.isBetslipVisible).toBe(true);
    });

    test("KambiClient should be visible by default", async () => {
      const client = createClientWithState(defaultState);

      const result = await client.query({
        query: queries.KAMBI_CLIENT_VISIBLE_QUERY,
      });

      expect(result.data.kambiClientVisible).toBe(true);
    });

    test("Search should be not be visible by default", async () => {
      const client = createClientWithState(defaultState);

      const result = await client.query({
        query: queries.SEARCH_VISIBLE_QUERY,
      });

      expect(result.data.isSearchVisible).toBe(false);
    });

    test("No modals should be shown by default", async () => {
      const client = createClientWithState(defaultState);

      const result = await client.query({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(result.data.activeModals).toEqual([]);
    });
  });

  describe("Mutation.openModal", () => {
    test("appends the modal to the list of active modals", async () => {
      const client = createClientWithState({
        activeModals: [],
        isBetslipVisible: false,
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
        isBetslipVisible: true,
      });

      await client.mutate({
        mutation: mutations.OPEN_MODAL_MUTATION,
        modal: "SOMETHING",
      });

      const result = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });
      expect(result.data.isBetslipVisible).toBe(false);
    });
  });

  describe("Mutation.closeModal", () => {
    test("removes the modal from the list of active modals", async () => {
      const client = createClientWithState({
        activeModals: [modal1, modal2],
        isBetslipVisible: false,
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
      const client = createClientWithState({
        activeModals: [modal1, modal2],
        isBetslipVisible: false,
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

      expect(result1.data.isBetslipVisible).toBe(false);

      await client.mutate({
        mutation: mutations.CLOSE_MODAL_MUTATION,
        variables: {
          modal: modal2,
        },
      });
      const result2 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result2.data.isBetslipVisible).toBe(true);
    });
  });

  describe("Mutation.closeAllModals", () => {
    test("resets the list of active modals to an empty array", async () => {
      const client = createClientWithState({
        activeModals: [modal1, modal2],
        isBetslipVisible: false,
      });

      await client.mutate({
        mutation: mutations.CLOSE_ALL_MODALS_MUTATION,
      });

      const result = await client.query({
        query: queries.ACTIVE_MODALS_QUERY,
      });

      expect(result.data.activeModals).toEqual([]);
    });

    test("sets betslip visibility to be true when all modals are closed", async () => {
      const client = createClientWithState({
        activeModals: [modal1, modal2],
        isBetslipVisible: false,
      });

      await client.mutate({
        mutation: mutations.CLOSE_ALL_MODALS_MUTATION,
      });

      const result = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result.data.isBetslipVisible).toBe(true);
    });
  });

  describe("Mutation.updateBetslipState", () => {
    test("sets the isBetslipVisible state correctly in the cache", async () => {
      const client = createClientWithState({
        isBetslipVisible: true,
      });

      await client.mutate({
        mutation: mutations.UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: false },
      });

      const result1 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result1.data.isBetslipVisible).toBe(false);

      await client.mutate({
        mutation: mutations.UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: true },
      });

      const result2 = await client.query({
        query: queries.BETSLIP_VISIBLE_QUERY,
      });

      expect(result2.data.isBetslipVisible).toBe(true);
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

  describe("Mutation.showSearch", () => {
    test("should enable search and hide kambi client", async () => {
      const client = createClientWithState({
        kambiClientVisible: true,
        isSearchVisible: false,
      });

      await client.mutate({ mutation: mutations.SHOW_SEARCH });

      const isSearchVisible = (await client.query({
        query: queries.SEARCH_VISIBLE_QUERY,
      })).data.isSearchVisible;

      const clientVisible = (await client.query({
        query: queries.KAMBI_CLIENT_VISIBLE_QUERY,
      })).data.kambiClientVisible;

      expect(isSearchVisible).toBe(true);
      expect(clientVisible).toBe(false);
    });
  });

  describe("Mutation.hideSearch", () => {
    test("should enable kambi client and hide search", async () => {
      const client = createClientWithState({
        kambiClientVisible: false,
        isSearchVisible: true,
      });

      await client.mutate({ mutation: mutations.HIDE_SEARCH });

      const isSearchVisible = (await client.query({
        query: queries.SEARCH_VISIBLE_QUERY,
      })).data.isSearchVisible;

      const clientVisible = (await client.query({
        query: queries.KAMBI_CLIENT_VISIBLE_QUERY,
      })).data.kambiClientVisible;

      expect(isSearchVisible).toBe(false);
      expect(clientVisible).toBe(true);
    });
  });
});
