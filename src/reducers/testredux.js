import { types } from "../actions/testredux";

export default function testredux(state = null, action) {
  switch (action.type) {
    case types.TEST:
      return state;
    default:
      return state;
  }
}
