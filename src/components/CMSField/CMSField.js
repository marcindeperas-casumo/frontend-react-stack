// @flow

import React from "react";
import type { Node } from "react";

export type Props = {
  isFetched: boolean,
  startFetch: () => void,
  text: string,
  view?: string => Node,
};

// TODO: Add skeleton for not-loaded state if needed d
export default class CMSField extends React.PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { text, view } = this.props;

    if (view) {
      return view(text);
    }

    return text;
  }
}
