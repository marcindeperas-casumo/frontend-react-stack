// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { ProgressBar } from "Components/ProgressBar";

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
  });
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
      className="u-padding--md u-height--1/1"
    >
      <Flex direction="vertical" justify="space-between">
        <ProgressBar progress={progress} />
        <Text size="xlg" data-test-id="txt">
          {t[page]}
        </Text>
      </Flex>
      <Flex align="stretch" justify="space-between">
        <Button
          variant="variant-2"
          className="o-flex--1 u-margin-right"
          data-test-id="buttonYes"
          onClick={() => next(1)}
        >
          {t.yes}
        </Button>
        <Button
          variant="variant-2"
          className="o-flex--1 u-margin-left"
          data-test-id="buttonNo"
          onClick={() => next(0)}
        >
          {t.no}
        </Button>
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
