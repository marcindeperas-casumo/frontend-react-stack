// @flow

import React from "react";
import type { Node } from "react";
import { identity } from "ramda";

export type Props = {
  isFetched: boolean,
  startFetch: () => void,
  text: string,
  view?: string => Node,
};

export class CMSField extends React.PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { text, view = identity } = this.props;

    return view(text);
  }
}
