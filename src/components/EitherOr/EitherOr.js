const EitherOr = ({ either, or, condition, ...restProps }) =>
  condition(restProps) ? either(restProps) : or(restProps);

export default EitherOr;
