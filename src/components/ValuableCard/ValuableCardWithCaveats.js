// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { type ValuableType, type ValuableState } from "Models/valuables";
import { ValuableCard } from "./ValuableCard";

type Props = {
  /** Unique id of the valuable */
  id: string,
  /** Title of the valuable */
  title: string,
  /** Description of the valuable. Ex: title of a game etc.*/
  description?: string,
  /** Valuable type of the valuable */
  valuableType: ValuableType,
  /** currency of the player */
  currency: string,
  /** The coin value of each spin. Applies when valuable is type spins */
  coinValue?: number,
  /** Market of the player */
  market: string,
  /** URL of background image to be displayed in the Card header */
  backgroundImage: string,
  /** Valuable caveats to be displayed */
  caveat: ?string,
  /** The state of the valuable */
  valuableState: ValuableState,
  /** The date on which the valuable will expiry */
  expirationTimeInHours: number,
  /** Function to be triggered on click of card */
  onCardClick: () => void,
  /** translated label for the 'hours' unit */
  translatedHoursUnit: string,
};

export class ValuableCardWithCaveats extends PureComponent<Props> {
  render() {
    const { caveat } = this.props;

    return (
      <div>
        <ValuableCard {...this.props} />
        {caveat && (
          <Text
            size="2xs"
            className="t-color-grey-light-1 u-text-align-center u-margin-top u-padding-x"
            tag="div"
          >
            <DangerousHtml html={caveat} />
          </Text>
        )}
      </div>
    );
  }
}
