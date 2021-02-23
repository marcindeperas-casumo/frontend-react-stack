// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import { WildDots } from "Components/WildDots";

export type ConfirmationPage =
  | "RG_SUCCESS"
  | "RG_FAIL"
  | "RG_REQUIRED"
  | "SAVED_RIGHT_AWAY"
  | "BEING_REVIEWED";
type Props = {
  t: {
    saved_right_away_title: string,
    being_reviewed_title: string,
    being_reviewed_content: string,
    rg_success_title: string,
    rg_success_content: string,
    rg_fail_title: string,
    rg_fail_content: string,
    rg_required_title: string,
    rg_required_content: string,
    button_back_to_limits: string,
    button_answer_questions: string,
  },
  pages: Array<ConfirmationPage>,
  lastButtonAction: () => void,
  fetchTranslations: () => void,
  lastButtonCaption: TranslationKeys, // eslint-disable-line no-use-before-define
};
type TranslationKeys = $Keys<$PropertyType<Props, "t">>;
const confirmationPageToTranslation: {
  [ConfirmationPage]: {
    title: TranslationKeys,
    content?: TranslationKeys,
  },
} = {
  RG_SUCCESS: {
    title: "rg_success_title",
    content: "rg_success_content",
  },
  RG_FAIL: {
    title: "rg_fail_title",
    content: "rg_fail_content",
  },
  RG_REQUIRED: {
    title: "rg_required_title",
    content: "rg_required_content",
  },
  SAVED_RIGHT_AWAY: {
    title: "saved_right_away_title",
  },
  BEING_REVIEWED: {
    title: "being_reviewed_title",
    content: "rg_required_content",
  },
};

export function DepositLimitsConfirmations({ t, ...props }: Props) {
  React.useEffect(() => {
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  if (!t) {
    return null;
  }
  const numberOfPages = props.pages.length;
  const translationKeys =
    confirmationPageToTranslation[props.pages[pageNumber]];
  const isLastPage = pageNumber + 1 === numberOfPages;

  return (
    <Flex
      direction="vertical"
      align="stretch"
      spacing="none"
      className="u-padding--md u-height--full t-background-white c-deposit-limits-container"
    >
      <Text
        size="xlg"
        className="u-font-weight-black t-color-purple-80"
        data-test-id="txt"
      >
        {t[translationKeys.title]}
      </Text>
      {typeof translationKeys.content === "string" && (
        <Text className="t-color-grey-50">{t[translationKeys.content]}</Text>
      )}
      <Flex.Block />
      <Flex direction="vertical">
        {numberOfPages > 1 && (
          <Flex align="center" justify="center" className="u-padding-y--xlg">
            <WildDots
              numberOfDots={numberOfPages}
              activeDotIndex={pageNumber}
            />
          </Flex>
        )}
        <ButtonPrimary
          className="u-padding-y--md"
          size="md"
          onClick={() => {
            if (isLastPage) {
              props.lastButtonAction();
            } else {
              setPageNumber(R.add(1));
            }
          }}
          data-test-id="buttonNext"
        >
          {isLastPage ? (
            t[props.lastButtonCaption]
          ) : (
            <ArrowRightIcon className="t-color-white" />
          )}
        </ButtonPrimary>
      </Flex>
    </Flex>
  );
}
