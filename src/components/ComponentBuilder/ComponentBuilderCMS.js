// @flow
import React from "react";
import { ComponentBuilderRenderer } from "Components/ComponentBuilder/ComponentBuilderRenderer";

type Props = {
  /** The array of component definition objects. */
  componentDefinitions: Array<Object>,
};

export const ComponentBuilderCMS = ({ componentDefinitions = [] }: Props) => (
  <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
);
