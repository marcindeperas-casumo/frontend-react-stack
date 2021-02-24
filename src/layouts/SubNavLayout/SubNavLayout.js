// @flow
import cx from "classnames";
import * as React from "react";
import { Link } from "@reach/router";
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
            {links.map(link => (
              <div key={link.to} className="u-margin-x--md">
                <Link
                  getProps={({ isCurrent }) => ({
                    className: cx(
                      "u-font-weight-bold o-flex-align--center o-flex--vertical",
                      isCurrent
                        ? "c-sub-nav-item--active u-position-relative t-color-purple-80"
                        : "t-color-grey-70"
                    ),
                  })}
                  to={link.to}
                >
                  {link.text}
                </Link>
              </div>
            ))}
          </div>

          <div className="o-flex__block u-padding-x--lg">
            <InputField
              onChange={value => {}}
              className="u-width--full"
              inputClassName="u-width--full"
              placeholder="Search"
              type="text"
              value=""
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
