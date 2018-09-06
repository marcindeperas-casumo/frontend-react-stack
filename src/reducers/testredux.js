export default function testredux(state = null, action) {
  switch (action.type) {
    case "TEST":
      return state;
    default:
      return state;
  }
}
