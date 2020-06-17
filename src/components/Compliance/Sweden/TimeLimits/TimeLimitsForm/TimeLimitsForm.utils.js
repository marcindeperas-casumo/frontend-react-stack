// @flow
export function textInputOnChange(setter: number => void) {
  return (e: SyntheticInputEvent<HTMLInputElement>) =>
    setter(Number(e.currentTarget.value));
}
