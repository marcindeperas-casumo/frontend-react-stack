import { useMutation } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonInverted } from "@casumo/cmp-button";
import React from "react";
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
  onValuableConsumed: () => void;
  recentValuable: string | undefined;
  content:
    | {
        valuables_more_info: string;
      }
    | undefined;
};

export const InGameRecentValuableWidget = ({
  onValuableConsumed,
  recentValuable,
  content,
}: Props) => {
  const { loading, valuables, translations } = usePlayerValuableList();
  const [showModal, setShowModal] = React.useState(false);
  const [mutateValuable] = useMutation<
    A.UseValuableMutation,
    A.UseValuableMutationVariables
  >(UseValuable);
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

  if (!latestValuable) {
    return null;
  }

  return (
    <Flex className="u-padding--md" spacing="none">
      <Flex.Item className="c-valuable-row__thumbnail o-flex__item--no-shrink">
        <div className="c-ingame-recent-valuable__thumbnail bg-white u-padding--sm t-border-r u-overflow--hidden t-elevation--10">
          {loading ? (
            <div className="bg-grey-70 t-border-r c-ingame-recent-valuable__thumbnail u-width--full"></div>
          ) : (
            <ValuableThumbnail
              awardType={
                latestValuable.__typename === "PlayerValuableWageringLock"
                  ? latestValuable.awardType
                  : null
              }
              backgroundRenderer={
                <ValuableThumbnailRenderer
                  backgroundImage={latestValuable.backgroundImage}
                  valuableType={latestValuable.valuableType}
                />
              }
              coinValue={
                latestValuable.__typename === "PlayerValuableSpins"
                  ? latestValuable.coinValue
                  : null
              }
              currency={latestValuable.currency}
              expiryTimeLeft={getExpiryTimeLeft(latestValuable.expiryDate)}
              market={latestValuable.market}
              translations={translations}
              valuableState={latestValuable.valuableState}
              valuableType={latestValuable.valuableType}
              size="small"
            />
          )}
        </div>
      </Flex.Item>
      <Flex.Block className="u-padding-left--md">
        <Text className="text-white u-font-weight-bold u-margin-top--none">
          {loading ? (
            <div>
              <div className="bg-grey-70 c-ingame-recent-valuable__loading-text u-margin-bottom--sm"></div>
              <div className="bg-grey-70 c-ingame-recent-valuable__loading-text"></div>
            </div>
          ) : (
            latestValuable.content
          )}
        </Text>
        <Text className="text-grey-20 u-margin-top--none">
          {loading ? (
            <div>
              <div className="bg-grey-70 c-ingame-recent-valuable__loading-text"></div>
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
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; isOpen: boolean; onClos... Remove this comment to see the full error message
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
