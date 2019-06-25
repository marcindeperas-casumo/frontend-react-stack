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
      context: Context
    ) => {
      const currentModals = await context.cache.readQuery({
        query: ACTIVE_MODALS_QUERY,
      }).activeModals;

      await resolvers.Mutation.updateBetslipState(
        _,
        { isVisible: false },
        context
      );

      await context.cache.writeQuery({
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
      context: Context
    ) => {
      const currentModals = await context.cache.readQuery({
        query: ACTIVE_MODALS_QUERY,
      }).activeModals;

      const newActiveModals = currentModals.filter(m => m !== modal);

      // if all modals are closed, then allow betslip to be visible
      if (newActiveModals.length === 0) {
        await resolvers.Mutation.updateBetslipState(
          _,
          { isVisible: true },
          context
        );
      }

      await context.cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
          activeModals: newActiveModals,
        },
      });

      return null;
    },

    closeAllModals: async (_: null, __: null, context: Context) => {
      // all modals will be closed, so allow betslip to be visible
      await resolvers.Mutation.updateBetslipState(
        _,
        { isVisible: true },
        context
      );

      await context.cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
          activeModals: [],
        },
      });

      return null;
    },

    navigateClient: (
      _: null,
      { path, trackingLocation }: { path: string, trackingLocation: string },
      context: Context
    ) => {
      // TODO:(adampilks) - best place to do this?
      // close all modals on navigation
      context.cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
          activeModals: [],
        },
      });

      resolvers.Mutation.updateBetslipState(_, { isVisible: true }, context);

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
      cache.writeData({ data: { isBetslipVisible: isVisible } });
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
          isSearchVisible: true,
        },
      });

      return null;
    },

    hideSearch: (_: null, __: null, { cache }: Context) => {
      cache.writeData({
        data: {
          kambiClientVisible: true,
          isSearchVisible: false,
        },
      });

      return null;
    },
  },
};

export default resolvers;
