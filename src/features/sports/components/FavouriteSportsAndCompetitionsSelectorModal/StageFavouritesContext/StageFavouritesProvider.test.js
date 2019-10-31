import React from "react";
import { shallow, mount } from "enzyme";
import { actWait } from "Utils";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
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
      <MockedProviderWithContext
        mocks={[
          playerVerticalMock,
          noFavouritesMock,
          competitionsSuggestionsMock,
        ]}
      >
        <StageFavouritesProvider />
      </MockedProviderWithContext>
    );
    const instance = rendered.find(StageFavouritesProvider).instance();

    const fetchSports = jest.spyOn(instance, "fetchSports");
    instance.componentDidMount();

    expect(fetchSports).toHaveBeenCalledTimes(1);
  });

  test("should default to suggested competitions if user has none", async () => {
    const renderedNoFavourites = mount(
      <MockedProviderWithContext
        mocks={[
          playerVerticalMock,
          noFavouritesMock,
          competitionsSuggestionsMock,
        ]}
      >
        <StageFavouritesProvider />
      </MockedProviderWithContext>
    );
    const renderedWithFavourites = mount(
      <MockedProviderWithContext
        mocks={[playerVerticalMock, withFavouritesMock]}
      >
        <StageFavouritesProvider />
      </MockedProviderWithContext>
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
    test("should toggle whether the sport is selected", async () => {
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

      instance.toggleFavouriteSport(1);

      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: true },
        { id: 2, userFavourite: true },
      ]);

      instance.toggleFavouriteSport(2);

      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: true },
        { id: 2, userFavourite: false },
      ]);
    });
  });

  describe("toggleAllSports()", () => {
    test("should set all sports to be favourited if they aren't already", () => {
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

      instance.toggleAllSports();

      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: true },
        { id: 2, userFavourite: true },
        { id: 2, userFavourite: true },
      ]);
    });

    test("should set all sports to not favourited if they all are favourited", () => {
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

      instance.toggleAllSports();

      expect(rendered.state().sports).toEqual([
        { id: 1, userFavourite: false },
        { id: 2, userFavourite: false },
        { id: 2, userFavourite: false },
      ]);
    });
  });

  describe("getSelectedSportsCount()", () => {
    test("should return number of selected sports", () => {
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

      expect(instance.getSelectedSportsCount()).toBe(2);

      instance.toggleFavouriteSport(1);

      expect(instance.getSelectedSportsCount()).toBe(3);
    });
  });

  describe("setFavouriteCompetitions()", () => {
    test("should set the favouriteCompetitions for a given sport", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [{ id: 1 }],
      });

      instance.setFavouriteCompetitions(1, favouriteCompetitions);
      expect(rendered.state().sports[0]).toEqual({
        id: 1,
        favouriteCompetitions,
      });
    });
  });

  describe("toggleFavouriteCompetition()", () => {
    test("should set the favouriteCompetitions for a given sport", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [{ id: 1, favouriteCompetitions }],
      });

      instance.toggleFavouriteCompetition(1, { id: 999 });
      expect(rendered.state().sports[0].favouriteCompetitions).toEqual([
        ...favouriteCompetitions,
        { id: 999 },
      ]);
      instance.toggleFavouriteCompetition(1, { id: 999 });
      expect(rendered.state().sports[0].favouriteCompetitions).toEqual(
        favouriteCompetitions
      );
    });
  });

  describe("getSelectedIds()", () => {
    test("should return list of selected ids for sports and competitions", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
      const rendered = shallow(<StageFavouritesProvider />, {
        disableLifecycleMethods: true,
      });
      const instance = rendered.instance();

      rendered.setState({
        sports: [{ id: 1, userFavourite: true, favouriteCompetitions }],
      });

      expect(instance.getSelectedIds()).toEqual([1, 123, 456]);

      instance.toggleFavouriteCompetition(1, { id: 123 });
      expect(instance.getSelectedIds()).toEqual([1, 456]);

      instance.toggleFavouriteSport(1);
      expect(instance.getSelectedIds()).toEqual([456]);
    });
  });

  describe("isSelected()", () => {
    test("should return true only if that group id is selected", () => {
      const favouriteCompetitions = [{ id: 123 }, { id: 456 }];
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

      expect(instance.isSelected(1)).toBe(true);
      expect(instance.isSelected(123)).toBe(true);
      expect(instance.isSelected(2)).toBe(false);
      expect(instance.isSelected(-1)).toBe(false);
    });
  });
});
