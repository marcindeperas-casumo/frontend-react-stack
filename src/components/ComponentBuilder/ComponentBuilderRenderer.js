// @flow
import React, { PureComponent } from "react";
import ErrorBoundary from "Components/ErrorBoundary";
import { mapContentDefinitionToComponent } from "Components/ComponentBuilder/ComponentBuilder.utils";

type Props = {
  /** The array of component definition objects. */
  componentDefinitions: Array<Object>,
};

export default class ComponentBuilder extends PureComponent<Props> {
  render() {
    const { componentDefinitions = [] } = this.props;
    const hasNoDefinitions =
      !componentDefinitions || !componentDefinitions.length;

    if (hasNoDefinitions) {
      return null;
    }

    return (
      <React.Fragment>
        {componentDefinitions.map((definition, i) => (
          <ErrorBoundary key={i} withoutUserFeedback>
            {mapContentDefinitionToComponent(definition)}
          </ErrorBoundary>
        ))}
      </React.Fragment>
    );
  }
}
