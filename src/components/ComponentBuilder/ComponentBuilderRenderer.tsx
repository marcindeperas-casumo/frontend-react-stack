// @flow
import React, { PureComponent } from "react";
import { ErrorBoundary } from "Components/ErrorBoundary";
import { mapContentDefinitionToComponent } from "Components/ComponentBuilder/ComponentBuilder.utils";

type Props = {
  /** The array of component definition objects. */
  componentDefinitions: Array<Object>,
};

export class ComponentBuilderRenderer extends PureComponent<Props> {
  render() {
    const { componentDefinitions = [] } = this.props;
    const hasNoDefinitions =
      !componentDefinitions || !componentDefinitions.length;

    if (hasNoDefinitions) {
      return null;
    }

    return componentDefinitions.map<Object>((definition, i) => (
      <ErrorBoundary key={i} withoutUserFeedback>
        {/* @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Object' is not assignable to par... Remove this comment to see the full error message */}
        {mapContentDefinitionToComponent(definition)}
      </ErrorBoundary>
    ));
  }
}
