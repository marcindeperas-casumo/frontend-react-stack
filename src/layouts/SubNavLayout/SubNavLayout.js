// @flow
import cx from "classnames";
import * as React from "react";
import { Link, Location } from "@reach/router";
import InputField from "@casumo/cmp-input-field";
import { ContentWrapper } from "Components/ContentWrapper";

import "./SubNavLayout.scss";

type TLinkItem = {
  to: string,
  text: string,
};
type TProps = {
  links: TLinkItem[],
};

export const SubNavLayout = ({ links }: TProps) => {
  if (!links) {
    return null;
  }

  return (
    <div className="t-background-white">
      <ContentWrapper>
        <div className="c-sub-nav-layout o-flex-align--center">
          <div className="o-flex u-padding-right--sm">
            <Location>
              {({ location }) =>
                links.map(link => (
                  <div key={link.to} className="u-margin-x--md">
                    <Link
                      className={cx(
                        "u-font-weight-bold o-flex-align--center o-flex--vertical",
                        location.pathname === link.to
                          ? "t-color-purple-80"
                          : "t-color-grey-70"
                      )}
                      to={link.to}
                    >
                      <span>{link.text}</span>
                      {location.pathname === link.to && (
                        <div className="u-width--sm u-height--sm t-background-purple-80 t-border-r--circle u-margin-top--sm" />
                      )}
                    </Link>
                  </div>
                ))
              }
            </Location>
          </div>

          <div className="o-flex__block u-padding-x--lg">
            <InputField
              onChange={value => {}}
              className="u-width--full"
              inputClassName="u-width--full"
              placeholder="Search"
              type="text"
            />
          </div>

          <div className="u-padding-x--lg t-color-white t-background-grey-5 u-padding-y--md">
            Balance Component
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
