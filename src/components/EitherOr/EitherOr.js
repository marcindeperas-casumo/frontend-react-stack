// @flow
type Props = {
  either: Function,
  or: Function,
  condition: Function,
};

const EitherOr = ({ either, or, condition, ...restProps }: Props) =>
  condition(restProps) ? either(restProps) : or(restProps);

export default EitherOr;
