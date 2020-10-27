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
          44 /* padding from both sides + icon size */
      );
    }
  };

  const pillClass = classNames(
    "c-select t-border-r--pill u-height--xlg u-font-weight-bold u-font-sm u-padding-x",
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
      <div className="u-position-relative u-cursor-pointer u-height--xlg">
        <div
          ref={measuredRef}
          className="u-font-sm u-font-weight-bold u-position-absolute u-visibility--hidden"
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
                    size="md"
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
                    <CheckIcon size="md" className="t-color-purple-60" />
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
            "u-position-absolute u-right-0 u-top-0 u-height--xlg",
            {
              "u-pointer-events-none": !props.value,
            }
          )}
        >
          {props.value ? (
            <CloseIcon
              size="md"
              className="u-padding--sm t-color-white"
              onClick={() => props.onChange(null)}
            />
          ) : (
            <ChevronDownIcon size="md" className="u-padding--sm" />
          )}
        </Flex>
      </div>
    </>
  );
}
