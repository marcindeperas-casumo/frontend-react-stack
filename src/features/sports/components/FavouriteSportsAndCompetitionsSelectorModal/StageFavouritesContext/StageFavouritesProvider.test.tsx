import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { shallow, mount } from "enzyme";
import { actWait } from "Utils/apolloTestUtils";
import StageFavouritesProvider from "./StageFavouritesProvider";
import {
  withFavouritesMock,
  noFavouritesMock,
} from "./__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "./__mocks__/competititonSuggestionsQuery";
import playerVerticalMock from "./__mocks__/playerVerticalQuery";

const areFavouritesPopulatedForCustomisableSports = sports =>
  sports.reduce((result, sport) => {
    return (
      result &&
      (sport.canSelectSubgroups ? sport.favouriteCompetitions.length > 0 : true)
    );
  }, true);

describe("<StageFavouritesProvider />", () => {
  test("should fetch sports on mount", () => {
    const rendered = mount(
      <MockedProvider
        mocks={[
          playerVerticalMock,
          noFavouritesMock,
          competitionsSuggestionsMock,
        ]}
      >
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message */}
        <StageFavouritesProvider />
      </MockedProvider>
    );
    const instance = rendered.find(StageFavouritesProvider).instance();

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"fetchSports"' is not assignable... Remove this comment to see the full error message
    const fetchSports = jest.spyOn(instance, "fetchSports");
    instance.componentDidMount();

    expect(fetchSports).toHaveBeenCalledTimes(1);
  });

  test("should default to suggested competitions if user has none", async () => {
    const renderedNoFavourites = mount(
      <MockedProvider
        mocks={[
          playerVerticalMock,
          noFavouritesMock,
          competitionsSuggestionsMock,
        ]}
      >
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message */}
        <StageFavouritesProvider />
      </MockedProvider>
    );
    const renderedWithFavourites = mount(
      <MockedProvider mocks={[playerVerticalMock, withFavouritesMock]}>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message */}
        <StageFavouritesProvider />
      </MockedProvider>
    );

    await actWait(0);

    expect(
      areFavouritesPopulatedForCustomisableSports(
        renderedNoFavourites.find(StageFavouritesProvider).state().sports
      )
    ).toBe(true);
    expect(
      areFavouritesPopulatedForCustomisableSports(
        renderedWithFavourites.find(StageFavouritesProvider).state().sports
      )
    ).toBe(true);
  });

  describe("toggleFavouriteSport()", () => {
    test("should toggle whether the sport is selected", () => {
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [
          { id: 1, userFavourite: false },
          { id: 2, userFavourite: true },
        ],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteSport' does not exist on ... Remove this comment to see the full error message
      instance.toggleFavouriteSport(1);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: true },
        { id: 2, userFavourite: true },
      ]);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteSport' does not exist on ... Remove this comment to see the full error message
      instance.toggleFavouriteSport(2);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: true },
        { id: 2, userFavourite: false },
      ]);
    });
  });

  describe("toggleAllSports()", () => {
    test("should set all sports to be favourited if they aren't already", () => {
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [
          { id: 1, userFavourite: false },
          { id: 2, userFavourite: false },
          { id: 2, userFavourite: true },
        ],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleAllSports' does not exist on type ... Remove this comment to see the full error message
      instance.toggleAllSports();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: true },
        { id: 2, userFavourite: true },
        { id: 2, userFavourite: true },
      ]);
    });

    test("should set all sports to not favourited if they all are favourited", () => {
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [
          { id: 1, userFavourite: true },
          { id: 2, userFavourite: true },
          { id: 2, userFavourite: true },
        ],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleAllSports' does not exist on type ... Remove this comment to see the full error message
      instance.toggleAllSports();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: false },
        { id: 2, userFavourite: false },
        { id: 2, userFavourite: false },
      ]);
    });
  });

  describe("getSelectedSportsCount()", () => {
    test("should return number of selected sports", () => {
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [
          { id: 1, userFavourite: false },
          { id: 2, userFavourite: true },
          { id: 2, userFavourite: true },
        ],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSelectedSportsCount' does not exist o... Remove this comment to see the full error message
      expect(instance.getSelectedSportsCount()).toBe(2);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteSport' does not exist on ... Remove this comment to see the full error message
      instance.toggleFavouriteSport(1);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSelectedSportsCount' does not exist o... Remove this comment to see the full error message
      expect(instance.getSelectedSportsCount()).toBe(3);
    });
  });

  describe("setFavouriteCompetitions()", () => {
    test("should set the favouriteCompetitions for a given sport", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [{ id: 1 }],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setFavouriteCompetitions' does not exist... Remove this comment to see the full error message
      instance.setFavouriteCompetitions(1, favouriteCompetitions);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports[0]).toEqual({
        id: 1,
        favouriteCompetitions,
      });
    });
  });

  describe("toggleFavouriteCompetition()", () => {
    test("should set the favouriteCompetitions for a given sport", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [{ id: 1, favouriteCompetitions }],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteCompetition' does not exi... Remove this comment to see the full error message
      instance.toggleFavouriteCompetition(1, { id: 999 });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports[0].favouriteCompetitions).toEqual([
        ...favouriteCompetitions,
        { id: 999 },
      ]);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteCompetition' does not exi... Remove this comment to see the full error message
      instance.toggleFavouriteCompetition(1, { id: 999 });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sports' does not exist on type 'Readonly... Remove this comment to see the full error message
      expect(rendered.state().sports[0].favouriteCompetitions).toEqual(
        favouriteCompetitions
      );
    });
  });

  describe("getSelectedIds()", () => {
    test("should return list of selected ids for sports and competitions", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [{ id: 1, userFavourite: true, favouriteCompetitions }],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSelectedIds' does not exist on type '... Remove this comment to see the full error message
      expect(instance.getSelectedIds()).toEqual([1, 123, 456]);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteCompetition' does not exi... Remove this comment to see the full error message
      instance.toggleFavouriteCompetition(1, { id: 123 });
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSelectedIds' does not exist on type '... Remove this comment to see the full error message
      expect(instance.getSelectedIds()).toEqual([1, 456]);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFavouriteSport' does not exist on ... Remove this comment to see the full error message
      instance.toggleFavouriteSport(1);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSelectedIds' does not exist on type '... Remove this comment to see the full error message
      expect(instance.getSelectedIds()).toEqual([456]);
    });
  });

  describe("isSelected()", () => {
    test("should return true only if that group id is selected", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [
          { id: 1, userFavourite: true, favouriteCompetitions },
          { id: 2, userFavourite: false, favouriteCompetitions: [] },
        ],
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type 'Comp... Remove this comment to see the full error message
      expect(instance.isSelected(1)).toBe(true);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type 'Comp... Remove this comment to see the full error message
      expect(instance.isSelected(123)).toBe(true);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type 'Comp... Remove this comment to see the full error message
      expect(instance.isSelected(2)).toBe(false);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSelected' does not exist on type 'Comp... Remove this comment to see the full error message
      expect(instance.isSelected(-1)).toBe(false);
    });
  });
});
