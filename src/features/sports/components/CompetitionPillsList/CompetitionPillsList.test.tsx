import React from "react";
import { shallow } from "enzyme";
import CompetitionPillsList from "./CompetitionPillsList";
import competitions from "./__mocks__/competitions";

describe("<CompetitionPillsList />", () => {
  test("renders the competitions passed in as GroupPill", () => {
    const rendered = shallow(
      <CompetitionPillsList competitions={competitions} />
    );
    const renderedEmpty = shallow(<CompetitionPillsList competitions={[]} />);

    expect(rendered.find("GroupPill")).toHaveLength(competitions.length);
    expect(renderedEmpty.find("GroupPill")).toHaveLength(0);
  });

  test("renders add button only when onAdd callback is provided", () => {
    const rendered = shallow(
      <CompetitionPillsList competitions={competitions} onAdd={() => {}} />
    );
    const renderedNoOnAdd = shallow(
      <CompetitionPillsList competitions={competitions} />
    );

    expect(rendered.find("EditPillsButton")).toHaveLength(1);
    expect(renderedNoOnAdd.find("EditPillsButton")).toHaveLength(0);
  });

  test("passes the onAdd callback to the add button", () => {
    const onAdd = jest.fn();
    const rendered = shallow(
      <CompetitionPillsList competitions={competitions} onAdd={onAdd} />
    );

    expect(rendered.find("EditPillsButton").props().onClick).toBe(onAdd);
  });

  test("passes correct competition item to onClick callback", () => {
    const onClick = jest.fn();
    const rendered = shallow(
      <CompetitionPillsList competitions={competitions} onClick={onClick} />
    );
    const indexToTest = 2;

    rendered.find("GroupPill").at(indexToTest).simulate("click");

    expect(onClick).toHaveBeenCalledWith(competitions[indexToTest]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("uses userFavourite to determine if active, if no isActive is provided", () => {
    const rendered = shallow(
      <CompetitionPillsList competitions={competitions} />
    );
    const pills = rendered.find("GroupPill");

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isActive' does not exist on type 'HTMLAt... Remove this comment to see the full error message
    expect(pills.first().props().isActive).toBe(true);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isActive' does not exist on type 'HTMLAt... Remove this comment to see the full error message
    expect(pills.at(1).props().isActive).toBeFalsy();
  });

  test("passes correct competition to isActive callback", () => {
    const isActive = jest.fn();
    shallow(
      <CompetitionPillsList
        competitions={[competitions[0]]}
        isActive={isActive}
      />
    );

    expect(isActive).toHaveBeenCalledWith(competitions[0]);
    expect(isActive).toHaveBeenCalledTimes(1);
  });

  test("calls isActive for each pill and passes result to pill", () => {
    const isActive = jest.fn().mockReturnValue(true).mockReturnValueOnce(false);

    const rendered = shallow(
      <CompetitionPillsList competitions={competitions} isActive={isActive} />
    );
    const pills = rendered.find("GroupPill");

    expect(isActive).toHaveBeenCalledTimes(competitions.length);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isActive' does not exist on type 'HTMLAt... Remove this comment to see the full error message
    expect(pills.first().props().isActive).toBe(false);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isActive' does not exist on type 'HTMLAt... Remove this comment to see the full error message
    expect(pills.at(2).props().isActive).toBe(true);
  });
});
