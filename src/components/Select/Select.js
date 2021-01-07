// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon, ChevronDownIcon, CheckIcon } from "@casumo/cmp-icons";
import { isMobile } from "Components/ResponsiveLayout";
import "./select.scss";

type Props<T> = {
  onChange: T => void,
  value: ?T,
  options: { [T]: string },
  /** value used when nothing is selected */
  emptyState: string,
};
export function Select<T>(props: Props<T>) {
  const [width, setWidth] = React.useState(0);
  /**
   * On desktop we have fake select component, that seems to be only option to
   * style options (choices) properly. On mobile we're using native select so
   * users will have better experience.
   */
  const [desktopSelect, setDesktopSelect] = React.useState(false);
  const measuredRef = node => {
    if (node !== null) {
      setWidth(
        node.getBoundingClientRect().width +
          /* padding from both sides (8) + icon size (20) */
          36
      );
    }
  };

  const pillFontClass = "u-font-weight-bold u-font-xs u-line-height--1";
  const pillClass = classNames(
    "c-select t-border-r--pill u-padding-x u-height--xlg",
    pillFontClass,
    props.value
      ? "t-background-grey-70 t-color-white"
      : "t-background-grey-5 t-color-grey-90"
  );

  return (
    <>
      {desktopSelect && (
        <div
          className="c-rsmodal__overlay c-select__overlay"
          onClick={() => setDesktopSelect(!desktopSelect)}
        />
      )}
      <div className="u-position-relative u-cursor-pointer">
        <div
          ref={measuredRef}
          className={classNames(
            "u-position-absolute u-visibility--hidden",
            pillFontClass
          )}
        >
          {props.value ? props.options[props.value] : props.emptyState}
        </div>
        {isMobile() ? (
          <select
            value={props.value || ""}
            className={pillClass}
            style={{ width }}
            onChange={event => props.onChange((event.target.value: T))}
          >
            <option value="" disabled hidden>
              {props.emptyState}
            </option>
            {Object.keys(props.options).map(key => (
              <option key={key} value={key}>
                {props.options[key] || props.emptyState}
              </option>
            ))}
          </select>
        ) : (
          <Flex
            align="center"
            style={{ width }}
            onClick={() => setDesktopSelect(!desktopSelect)}
            className={pillClass}
          >
            {props.value ? props.options[props.value] : props.emptyState}
          </Flex>
        )}
        {desktopSelect && (
          <Flex
            direction="vertical"
            className="u-text-nowrap u-position-absolute c-select__options-list"
          >
            <div className="u-position-absolute c-select__options-list-arrow" />
            <Flex
              direction="vertical"
              className="t-background-white t-border-r--md u-overflow--hidden"
            >
              {Object.keys(props.options).map(key => (
                <Flex
                  key={key}
                  align="center"
                  justify="space-between"
                  className="t-border-bottom u-padding--md"
                  onClick={() => {
                    setDesktopSelect(false);
                    props.onChange(key);
                  }}
                >
                  <Text
                    size="xs"
                    className={classNames(
                      "u-padding-right--5xlg",
                      key === props.value
                        ? "t-color-grey-90"
                        : "t-color-grey-50"
                    )}
                  >
                    {props.options[key]}
                  </Text>
                  {key === props.value && (
                    <CheckIcon className="t-color-purple-60 c-chip__x-icon" />
                  )}
                </Flex>
              ))}
            </Flex>
          </Flex>
        )}
        <Flex
          align="center"
          justify="end"
          className={classNames(
            "u-position-absolute u-padding-right--sm u-right-0 u-top-0 u-height--xlg",
            {
              "u-pointer-events-none": !props.value,
            }
          )}
        >
          {props.value ? (
            <CloseIcon
              className="t-color-white c-chip__x-icon"
              onClick={() => props.onChange(null)}
            />
          ) : (
            <ChevronDownIcon className="c-chip__x-icon" />
          )}
        </Flex>
      </div>
    </>
  );
}
