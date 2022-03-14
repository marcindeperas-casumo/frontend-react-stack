import React from "react";
import { mount } from "enzyme";
import List from "@casumo/cmp-list";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import MockStore from "Components/MockStore";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRow } from "Components/ValuableRow";
import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";

describe("ValuablesVerticalList", () => {
  const mockedValuables = mockValuables();
  let onMoreInfo;
  let rendered;

  beforeEach(() => {
    onMoreInfo = jest.fn();
    rendered = mount(
      <MockStore queryMocks={[...mocks.mockedValuables]}>
        <ValuablesVerticalList
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message
          valuables={mockedValuables}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message
          translations={{}}
          onMoreInfo={onMoreInfo}
        />
      </MockStore>
    );
  });

  test("should render a list of valuable rows", () => {
    expect(getValuableRows().length).toEqual(mockedValuables.length);
  });

  test("should pass not selected to ValuableRow if valuable is active and isItemSelectable is false", () => {
    const mockedData = [
      {
        ...mockedValuables[0],
        valuableState: "Used",
      },
    ];

    const queryMock = [
      {
        ...mocks.mockedValuables[0],
        result: {
          data: {
            player: {
              __typename: "Player",
              valuables: mockedData,
            },
          },
        },
      },
    ];

    rendered = mount(
      <MockStore queryMocks={[...queryMock]}>
        <ValuablesVerticalList
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message

          valuables={mockedData}
          loading={false}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message
          translations={{}}
          onMoreInfo={onMoreInfo}
          isItemSelectable={false}
        />
      </MockStore>
    );

    expect(rendered.find(List).find(ValuableRow).prop("isSelected")).toEqual(
      false
    );
  });

  test("should pass selected to ValuableRow if valuable is active and isItemSelectable is true", () => {
    const mockedData = [
      {
        ...mockedValuables[0],
        valuableState: "Used",
      },
    ];

    const queryMock = [
      {
        ...mocks.mockedValuables[0],
        result: {
          data: {
            player: {
              __typename: "Player",
              valuables: mockedData,
            },
          },
        },
      },
    ];

    rendered = mount(
      <MockStore queryMocks={[...queryMock]}>
        <ValuablesVerticalList
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message

          valuables={mockedData}
          loading={false}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message
          translations={{}}
          onMoreInfo={onMoreInfo}
          isItemSelectable={true}
        />
      </MockStore>
    );

    expect(rendered.find(List).find(ValuableRow).prop("isSelected")).toEqual(
      true
    );
  });

  const getValuableRows = () => rendered.find(List).find(ValuableRow);
});
