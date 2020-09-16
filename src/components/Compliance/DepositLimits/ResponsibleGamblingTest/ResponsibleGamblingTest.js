// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import { ProgressBar } from "Components/Progress";

type Props = {
  t: {
    yes: string,
    no: string,
    [number]: string,
  },
  fetchQuestions: () => void,
  sendRGTestResult: boolean => void,
  numberOfQuestions?: number,
};

export function ResponsibleGamblingTest({
  t,
  numberOfQuestions = 10,
  ...props
}: Props) {
  const [{ answers, page }, next] = usePaging();
  React.useEffect(() => {
    props.fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (page === numberOfQuestions) {
      const allResponsesEqualNo = !R.find(R.equals(1), answers);
      props.sendRGTestResult(allResponsesEqualNo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, page]);

  if (!t || page === numberOfQuestions) {
    return "Loading";
  }

  const progress = (page / (numberOfQuestions - 1)) * 100;

  return (
    <Flex
      direction="vertical"
      justify="space-between"
      className="u-padding--md u-height--full t-background-white c-deposit-limits-container"
    >
      <ProgressBar progress={progress} />
      <Text size="xlg" data-test-id="txt">
        {t[page + 1]}
      </Text>
      <Flex>
        <Flex.Block>
          <ButtonPrimary
            size="sm"
            className="u-width--full u-margin-right"
            data-test-id="buttonYes"
            onClick={() => next(1)}
          >
            {t.yes}
          </ButtonPrimary>
        </Flex.Block>
        <Flex.Block>
          <ButtonSecondary
            size="sm"
            className="u-width--full u-margin-left"
            data-test-id="buttonNo"
            onClick={() => next(0)}
          >
            {t.no}
          </ButtonSecondary>
        </Flex.Block>
      </Flex>
    </Flex>
  );
}

function usePaging(initialPage: number = 0) {
  const [page, setPage] = React.useState<number>(initialPage);
  const [answers, setAnswers] = React.useState<number[]>([]);

  function next(value: 1 | 0) {
    setAnswers(R.append(value));
    setPage(R.add(1));
  }

  return [{ answers, page }, next];
}
