// @flow
import React from "react";
import { shallow } from "enzyme";
import { withFavouritesResult } from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";

const footballGroup = withFavouritesResult.groups[0];
const tennisGroup = withFavouritesResult.groups[1];

describe("<FavouriteSportsSelectorListItem />", () => {
  test("renders FavouriteListItem for this group", () => {
    const rendered = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={false}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    expect(rendered.find("FavouriteListItem").props().label).toBe(
      footballGroup.name
    );
    expect(rendered.find("FavouriteListItem").props().isFavourite).toBe(false);
    expect(rendered.find("FavouriteListItem").props().isFavouritable).toBe(
      rendered.props().isFavouritable
    );
  });

  test("should render a CompetitionPillsList if the group has selectable competitions and is selected", () => {
    const renderedNotFavourite = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={false}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    const renderedFavourite = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    const renderedNoSubgroups = shallow(
      <FavouriteSportsSelectorListItem
        group={tennisGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    expect(renderedNotFavourite.find("CompetitionPillsList")).toHaveLength(0);
    expect(renderedFavourite.find("CompetitionPillsList")).toHaveLength(1);
    expect(renderedNoSubgroups.find("CompetitionPillsList")).toHaveLength(0);
  });

  test("should render a CompetitionsIntro and also hide add button in CompetitionPillsList if showCompetitionIntro is true", () => {
    const renderedNoIntro = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );
    const renderedWithIntro = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={true}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    expect(
      renderedNoIntro.find("FavouriteSportsSelectorCompetitionsIntro")
    ).toHaveLength(0);
    expect(
      renderedNoIntro.find("CompetitionPillsList").props().onAdd
    ).toBeTruthy();

    expect(
      renderedWithIntro.find("FavouriteSportsSelectorCompetitionsIntro")
    ).toHaveLength(1);
    expect(
      renderedWithIntro.find("CompetitionPillsList").props().onAdd
    ).toBeFalsy();
  });

  test("should call onToggleFavouriteSport when the ListItem is clicked", () => {
    const onToggleFavouriteSport = jest.fn();
    const rendered = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={onToggleFavouriteSport}
        isFavourite={false}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    rendered.find("FavouriteListItem").simulate("click");

    expect(onToggleFavouriteSport).toHaveBeenCalledWith(footballGroup.id);
  });

  test("should call onAddCompetition when add button on CompetitionPillsList/FavouriteSportsSelectorCompetitionsIntro is clicked", () => {
    const onAddCompetition = jest.fn();
    const rendered = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={false}
        onAddCompetition={onAddCompetition}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );
    const renderedWithIntro = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={true}
        onAddCompetition={onAddCompetition}
        onRemoveFavouriteCompetition={() => {}}
        isOnboarding={false}
      />
    );

    rendered
      .find("CompetitionPillsList")
      .props()
      .onAdd();

    renderedWithIntro
      .find("FavouriteSportsSelectorCompetitionsIntro")
      .props()
      .onAdd();

    expect(onAddCompetition).toHaveBeenNthCalledWith(1, footballGroup.id);
    expect(onAddCompetition).toHaveBeenNthCalledWith(2, footballGroup.id);
  });

  test("should call onRemoveFavouriteCompetition call when user requests to remove a favourited competition in the CompetitionPillsList", () => {
    const onRemoveFavouriteCompetition = jest.fn();
    const rendered = shallow(
      <FavouriteSportsSelectorListItem
        group={footballGroup}
        onToggleFavouriteSport={() => {}}
        isFavourite={true}
        showCompetitionIntro={false}
        onAddCompetition={() => {}}
        onRemoveFavouriteCompetition={onRemoveFavouriteCompetition}
        isOnboarding={false}
      />
    );

    rendered
      .find("CompetitionPillsList")
      .props()
      .onRemove(footballGroup.favouriteCompetitions[0]);

    expect(onRemoveFavouriteCompetition).toHaveBeenCalledWith(
      footballGroup.id,
      footballGroup.favouriteCompetitions[0]
    );
  });
});
