import { connect } from "react-redux";
import { SportsYouWonComponent } from "./SportsYouWonComponent";

export default connect(
  (state, ownProps) => ({
    ...ownProps,
  }),
  {}
)(SportsYouWonComponent);
