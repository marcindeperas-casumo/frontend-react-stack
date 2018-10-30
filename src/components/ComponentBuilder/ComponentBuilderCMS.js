// @flow
import React, { PureComponent } from "react";
import ComponentBuilderRenderer from "Components/ComponentBuilder/ComponentBuilderRenderer";

type Props = {
  /** The array of component definition objects. */
  componentDefinitions: Array<Object>,
  /** A boolean indicating if the "fetch" function should be called on componentDidMount(). */
  shouldFetch: boolean,
  /** A function to be called if fetching is needed. */
  fetch: Function,
};

export default class ComponentBuilderCMS extends PureComponent<Props> {
  componentDidMount() {
    const { shouldFetch, fetch } = this.props;

    if (shouldFetch) {
      fetch();
    }
  }

  render() {
    const { componentDefinitions = [] } = this.props;

    return (
      <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
    );
  }
}
