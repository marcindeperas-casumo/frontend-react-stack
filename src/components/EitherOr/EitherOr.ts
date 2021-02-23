// @flow
type Props = {
  either: Function,
  or: Function,
  condition: Function,
};

export const EitherOr = ({ either, or, condition, ...restProps }: Props) =>
  condition(restProps) ? either(restProps) : or(restProps);
