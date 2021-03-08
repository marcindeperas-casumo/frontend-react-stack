import * as React from "react";
import cx from "classnames";
import { Link } from "@reach/router";

type TProps = {
  to: string;
  children: React.ReactChild;
  activeClassName?: string;
  className?: string;
};

export const NavLink = ({
  to,
  children,
  className = "",
  activeClassName = "",
}: TProps) => {
  return (
    <Link
      getProps={({ isPartiallyCurrent }) => ({
        className: cx(className, { [activeClassName]: isPartiallyCurrent }),
      })}
      to={to}
    >
      {children}
    </Link>
  );
};
