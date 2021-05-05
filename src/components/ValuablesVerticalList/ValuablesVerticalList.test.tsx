import React from "react";
import { mount } from "enzyme";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { actWait } from "Utils/apolloTestUtils";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import MockStore from "Components/MockStore";

const SELECTED_SVG_SELECTOR = 'div[data-test="valuable-selector-svg"]';
const VALUABLE_ROW_SELECTOR = 'div[data-test="valuable-row"]';

describe("ValuablesVerticalList", () => {
  const mockedValuables = mockValuables();
  let onMoreInfo;
  let rendered;

  beforeEach(() => {
    onMoreInfo = jest.fn();
    rendered = mount(
      <MockStore>
        <ValuablesVerticalList
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ __typename: string; id: string; valuableT... Remove this comment to see the full error message
          valuables={mockedValuables}
          loading={false}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'ValuableListT... Remove this comment to see the full error message
          translations={{}}
          onMoreInfo={onMoreInfo}
        />
      </MockStore>
    );
  });

  test("should render skeleton while loading", async () => {
    rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'ValuableListT... Remove this comment to see the full error message */}
        <ValuablesVerticalList
          valuables={[]}
          loading={true}
          translations={{}}
        />
      </MockStore>
    );

    await actWait();

    expect(rendered.find("svg").exists()).toBe(true);
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

    rendered = mount(
      <MockStore>
        <ValuablesVerticalList
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message
          valuables={mockedData}
          loading={false}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'ValuableListT... Remove this comment to see the full error message
          translations={{}}
          onMoreInfo={onMoreInfo}
          isItemSelectable={false}
        />
      </MockStore>
    );

    expect(getSelectedSVGCount()).toEqual(0);
  });

  test("should pass selected to ValuableRow if valuable is active and isItemSelectable is true", () => {
    const mockedData = [
      {
        ...mockedValuables[0],
        valuableState: "Used",
      },
    ];

    rendered = mount(
      <MockStore>
        <ValuablesVerticalList
          // @ts-expect-error ts-migrate(2322) FIXME: Type '({ valuableState: string; __typename: string... Remove this comment to see the full error message
          valuables={mockedData}
          loading={false}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'ValuableListT... Remove this comment to see the full error message
          translations={{}}
          onMoreInfo={onMoreInfo}
          isItemSelectable={true}
        />
      </MockStore>
    );

    expect(getSelectedSVGCount()).toEqual(1);
  });

  const getSelectedSVGCount = () =>
    rendered
      .find(SELECTED_SVG_SELECTOR)
      .filterWhere(n => n.text() === "SVGR_Mock").length;
  const getValuableRows = () => rendered.find(VALUABLE_ROW_SELECTOR);
});
