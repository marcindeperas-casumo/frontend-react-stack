// @flow
import React, { PureComponent } from "react";
import { ComponentBuilderRenderer } from "Components/ComponentBuilder/ComponentBuilderRenderer";

type Props = {
  /** The array of component definition objects. */
  componentDefinitions: Array<Object>,
  /** A function for fetching the CMS page */
  fetch: Function,
};

export class ComponentBuilderCMS extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { componentDefinitions = [] } = this.props;

    return (
      <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
    );
  }
}
