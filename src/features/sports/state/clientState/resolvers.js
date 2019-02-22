/* @flow */

import { uniq } from "ramda";
import type { InMemoryCache } from "apollo-cache-inmemory";

import { getKambiWidgetAPI } from "Features/sports/kambi";

import { ACTIVE_MODALS_QUERY } from "./queries";

type Context = {
  cache: InMemoryCache,
};

const resolvers = {
  Mutation: {
    openModal: async (
      _: null,
      { modal }: { modal: Modal },
      { cache }: Context
    ) => {
      const currentModals = await cache.readQuery({
        query: ACTIVE_MODALS_QUERY,
      }).activeModals;

      await cache.writeData({ data: { betslipVisible: false } });

      await cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
          activeModals: uniq([...currentModals, modal]),
        },
      });

      return null;
    },

    closeModal: async (
      _: null,
      { modal }: { modal: Modal },
      { cache }: Context
    ) => {
      const currentModals = await cache.readQuery({
        query: ACTIVE_MODALS_QUERY,
      }).activeModals;

      const newActiveModals = currentModals.filter(m => m !== modal);

      // if all modals are closed, then allow betslip to be visible
      if (newActiveModals.length === 0) {
        await cache.writeData({ data: { betslipVisible: true } });
      }

      await cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
          activeModals: newActiveModals,
        },
      });

      return null;
    },

    navigateClient: (
      _: null,
      { path, trackingLocation }: { path: string, trackingLocation: string },
      { cache }: Context
    ) => {
      // TODO:(adampilks) - best place to do this?
      // close all modals on navigation
      cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
          activeModals: [],
        },
      });

      getKambiWidgetAPI().then(wapi =>
        wapi.navigateClient(path, trackingLocation)
      );

      return null;
    },

    updateBetslipState: (
      _: null,
      { isVisible }: { isVisible: boolean },
      { cache }: Context
    ) => {
      cache.writeData({ data: { betslipVisible: isVisible } });
      return null;
    },

    updateKambiClientState: (
      _: null,
      { isVisible }: { isVisible: boolean },
      { cache }: Context
    ) => {
      cache.writeData({ data: { kambiClientVisible: isVisible } });
      return null;
    },

    showSearch: (_: null, __: null, { cache }: Context) => {
      cache.writeData({
        data: {
          kambiClientVisible: false,
          searchVisible: true,
        },
      });

      return null;
    },

    hideSearch: (_: null, __: null, { cache }: Context) => {
      cache.writeData({
        data: {
          kambiClientVisible: true,
          searchVisible: false,
        },
      });

      return null;
    },
  },
};

export default resolvers;
