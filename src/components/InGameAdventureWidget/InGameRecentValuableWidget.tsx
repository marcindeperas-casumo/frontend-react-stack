// @flow
import React from "react";
import { useMutation } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonInverted } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import ImageLazy from "Components/Image/ImageLazy";
import { ValuableCard } from "Components/ValuableCard";
import { ValuableDetailsWithModal } from "Components/ValuableDetails";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { ValuableThumbnail } from "Components/ValuableThumbnail";
import { VALUABLE_TYPES, getExpiryTimeLeft } from "Models/valuables";
import { UseValuable } from "Components/PlayerValuableList/PlayerValuables.graphql";

import "./InGameRecentValuableWidget.scss";

const ValuableThumbnailRenderer = ({ backgroundImage, valuableType }) => {
  const imgixOptsForSpins = {
    blur: 100,
    blend: "AAB8B8",
    blendMode: "normal",
    blendAlpha: 20,
  };
  return (
    <ImageLazy
      className="u-object-fit-cover u-width--full u-height--full t-border-r u-overflow--hidden"
      src={backgroundImage}
      imgixOpts={valuableType === VALUABLE_TYPES.SPINS ? imgixOptsForSpins : {}}
    />
  );
};

type Props = {
  onValuableConsumed: () => void,
  recentValuable: ?string,
  content: ?{
    valuables_more_info: string,
  },
};

export const InGameRecentValuableWidget = ({
  onValuableConsumed,
  recentValuable,
  content,
}: Props) => {
  const { loading, valuables, translations } = usePlayerValuableList();
  const [showModal, setShowModal] = React.useState(false);
  const [mutateValuable] = useMutation<A.UseValuable, A.UseValuableVariables>(
    UseValuable
  );
  const consumeValuable = (id: string) => {
    setShowModal(false);

    return mutateValuable({
      variables: {
        id,
        source: "mobile",
      },
    }).then(() => {
      onValuableConsumed();
    });
  };

  if (!loading && (!translations || !valuables.length)) {
    return null;
  }

  const latestValuable = valuables.find(
    valuable => valuable.id === recentValuable
  );

  return (
    <Flex className="u-padding--md" spacing="none">
      <Flex.Item className="c-valuable-row__thumbnail o-flex__item--no-shrink">
        <div className="c-ingame-recent-valuable__thumbnail t-background-white u-padding--sm t-border-r u-overflow--hidden t-elevation--10">
          {!loading ? (
            <ValuableThumbnail
              awardType={latestValuable.awardType}
              backgroundRenderer={
                <ValuableThumbnailRenderer
                  backgroundImage={latestValuable.backgroundImage}
                  valuableType={latestValuable.valuableType}
                />
              }
              coinValue={latestValuable.coinValue}
              currency={latestValuable.currency}
              expiryTimeLeft={getExpiryTimeLeft(latestValuable.expiryDate)}
              market={latestValuable.market}
              translations={translations}
              valuableState={latestValuable.valuableState}
              valuableType={latestValuable.valuableType}
              size="small"
            />
          ) : (
            <div className="t-background-grey-70 t-border-r c-ingame-recent-valuable__thumbnail u-width--full"></div>
          )}
        </div>
      </Flex.Item>
      <Flex.Block className="u-padding-left--md">
        <Text className="t-color-white u-font-weight-bold u-margin-top--none">
          {loading ? (
            <div>
              <div className="t-background-grey-70 c-ingame-recent-valuable__loading-text u-margin-bottom--sm"></div>
              <div className="t-background-grey-70 c-ingame-recent-valuable__loading-text"></div>
            </div>
          ) : (
            latestValuable.content
          )}
        </Text>
        <Text className="t-color-grey-20 u-margin-top--none">
          {loading ? (
            <div>
              <div className="t-background-grey-70 c-ingame-recent-valuable__loading-text"></div>
            </div>
          ) : (
            latestValuable.caveat
          )}
        </Text>
        <div className="u-text-align-right">
          {!loading && (
            <ButtonInverted
              className="u-margin-top--md"
              onClick={() => {
                setShowModal(true);
              }}
              size="md"
            >
              <Text className="u-margin--none u-padding-x" tag="span">
                {content?.valuables_more_info}
              </Text>
            </ButtonInverted>
          )}
        </div>
      </Flex.Block>

      {showModal && (
        <ValuableDetailsWithModal
          isOpen={Boolean(showModal)}
          onClose={() => setShowModal(false)}
          onConsumeValuable={consumeValuable}
          valuableDetails={latestValuable}
          isGamePage={true}
        >
          <div className="c-valuable-details__valuable-card o-position--relative">
            <ValuableCard
              {...latestValuable}
              translations={translations}
              caveat={null}
              className="t-elevation--30"
            />
          </div>
        </ValuableDetailsWithModal>
      )}
    </Flex>
  );
};
