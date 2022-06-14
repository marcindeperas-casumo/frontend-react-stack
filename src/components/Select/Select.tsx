import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon, ChevronDownIcon, CheckIcon } from "@casumo/cmp-icons";
import classNames from "classnames";
import * as React from "react";
import { isMobile } from "Components/ResponsiveLayout";
import "./select.scss";

type Props<T> = {
  onChange: (t: T) => void;
  value: T | undefined;
  // @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
  options: { [T]: string };
  /** value used when nothing is selected */
  emptyState: string;
  selectClassNames?: string;
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
          /* padding from icon size (20) */
          20
      );
    }
  };

  const pillFontClass = "u-font-weight-bold u-font-xs u-line-height--1";
  const pillClass = classNames(
    // TODO: THIS SHOULD BE TEMPORARY BECAUSE WE NEED TO CHANGE CSS OF SELECT ON CUDL
    // THERE IS A TASK: https://casumo.atlassian.net/browse/TCAS-2311
    "t-border-r--pill u-padding-x u-height--xlg box-content c-select c-temporary-important-maring-right",
    pillFontClass,
    props.value ? "bg-grey-70 text-white" : "bg-grey-5 text-grey-90"
  );

  const selectClassNames = props?.selectClassNames || "";

  return (
    <>
      {desktopSelect && (
        <div
          className="c-rsmodal__overlay c-select__overlay"
          onClick={() => setDesktopSelect(!desktopSelect)}
        />
      )}
      <div
        className={classNames(
          "o-position--relative u-cursor--pointer",
          selectClassNames
        )}
      >
        <div
          ref={measuredRef}
          className={classNames(
            "o-position--absolute u-visibility--hidden",
            pillFontClass
          )}
        >
          {/* @ts-expect-error ts-migrate(2536) FIXME: Type 'T' cannot be used to index type '{}'. */}
          {props.value ? props.options[props.value] : props.emptyState}
        </div>
        {isMobile() ? (
          <select
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | T' is not assignable to type 'strin... Remove this comment to see the full error message
            value={props.value || ""}
            className={pillClass}
            style={{ width }}
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            onChange={event => props.onChange(event.target.value)}
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
            {/* @ts-expect-error ts-migrate(2536) FIXME: Type 'T' cannot be used to index type '{}'. */}
            {props.value ? props.options[props.value] : props.emptyState}
          </Flex>
        )}
        {desktopSelect && (
          <Flex
            direction="vertical"
            className="u-text-nowrap o-position--absolute c-select__options-list"
          >
            <div className="o-position--absolute c-select__options-list-arrow" />
            <Flex
              direction="vertical"
              className="bg-white t-border-r--md u-overflow--hidden"
            >
              {Object.keys(props.options).map(key => (
                <Flex
                  key={key}
                  align="center"
                  justify="space-between"
                  className="t-border-bottom u-padding--md"
                  onClick={() => {
                    setDesktopSelect(false);
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                    props.onChange(key);
                  }}
                >
                  <Text
                    size="xs"
                    className={classNames(
                      "u-padding-right--5xlg",
                      // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
                      key === props.value ? "text-grey-90" : "text-grey-50"
                    )}
                  >
                    {props.options[key]}
                  </Text>
                  {/* @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message */}
                  {key === props.value && (
                    <CheckIcon className="text-purple-60 c-chip__x-icon" />
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
            "o-position--absolute u-padding-right--sm o-inset-right--none o-inset-top--none u-height--xlg",
            {
              "u-pointer--none": !props.value,
            }
          )}
        >
          {props.value ? (
            <CloseIcon
              className="text-white c-chip__x-icon"
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
