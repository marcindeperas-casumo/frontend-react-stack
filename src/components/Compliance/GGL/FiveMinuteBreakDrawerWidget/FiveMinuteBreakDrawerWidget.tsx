import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import * as React from "react";
import Timer from "Components/Timer";
import { interpolateWithJSX } from "Utils";

import "./FiveMinuteBreakDrawerWidget.scss";

type Props = {
  className?: string;
  timeElapsed: number;
  timeLeft: number;
  t:
    | {
        tooltip_title: string | undefined;
        tooltip_message: string | undefined;
        remaining_seconds: string | undefined;
      }
    | undefined;
};

export const FiveMinuteBreakDrawerWidget = ({
  className,
  timeElapsed,
  timeLeft,
  t,
}: Props) => {
  const shouldShowTimeLeft = timeLeft - Date.now() <= 60 * 1000;

  return (
    <Flex
      className={cx(
        "c-five-minute-break-drawer-widget bg-grey-90 text-white u-padding--md t-border-r u-margin-bottom--none@desktop",
        className
      )}
      direction="vertical"
      spacing="md"
    >
      <Flex.Item>
        <Flex direction="horizontal">
          <Flex.Item>
            <TimeLockedIcon size="md" />
          </Flex.Item>
          <Flex.Block className="u-margin-left--md u-line-height--15">
            <Text size="sm" tag="div">
              {interpolateWithJSX(
                {
                  timeLeft: (
                    <Timer
                      startTime={timeElapsed}
                      onEnd={() => "1:00:00"}
                      render={state => `${state.minutes}:${state.seconds}`}
                    />
                  ),
                },
                t?.tooltip_title
              )}
            </Text>
            <Text size="sm" tag="div" className="text-grey-50">
              {t?.tooltip_message}
            </Text>
          </Flex.Block>
        </Flex>
      </Flex.Item>
      {shouldShowTimeLeft ? (
        <Flex.Item className="u-padding--md u-margin bg-grey-70 bg-opacity-25 t-border-r u-font-sm">
          {interpolateWithJSX(
            {
              secondsLeft: (
                <Timer
                  endTime={timeLeft}
                  onEnd={() => "00"}
                  render={state => (
                    <span className="u-font-variant-numeric--tabular-nums u-font-family--noncustom">
                      {state.seconds}
                    </span>
                  )}
                />
              ),
            },
            t?.remaining_seconds
          )}
        </Flex.Item>
      ) : null}
    </Flex>
  );
};
