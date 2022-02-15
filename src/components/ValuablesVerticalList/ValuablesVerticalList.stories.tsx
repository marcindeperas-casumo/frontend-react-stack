import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import translationsMock from "Components/PlayerValuableList/__mocks__/translations.mock.json";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";

const stories = storiesOf("ValuablesVerticalList", module);

stories.add("Default", () => {
  const valuables = mockValuables();
  const onConsume = () => {};

  return (
    <MockStore>
      <ValuablesVerticalList
        title="Valuables Vertical list"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '({ __typename: string; id: string; valuableT... Remove this comment to see the full error message
        valuables={valuables}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type '(s: s... Remove this comment to see the full error message
        onConsumeValuable={onConsume}
        // @ts-expect-error
        translations={translationsMock}
      />
    </MockStore>
  );
});
