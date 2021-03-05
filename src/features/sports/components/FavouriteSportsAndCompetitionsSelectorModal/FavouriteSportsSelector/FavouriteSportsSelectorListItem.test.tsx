import React from "react";
import { shallow } from "enzyme";
import { withFavouritesResult } from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";

const footballGroup = withFavouritesResult.groups[0];

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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFavourite' does not exist on type 'HTM... Remove this comment to see the full error message
    expect(rendered.find("FavouriteListItem").props().isFavourite).toBe(false);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFavouritable' does not exist on type '... Remove this comment to see the full error message
    expect(rendered.find("FavouriteListItem").props().isFavouritable).toBe(
      rendered.props().isFavouritable
    );
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

    expect(
      renderedNoIntro.find("FavouriteSportsSelectorCompetitionsIntro")
    ).toHaveLength(0);
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
});
