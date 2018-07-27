export default ({ either, or, condition, ...restProps }) =>
  condition(restProps) ? either(restProps) : or(restProps);
