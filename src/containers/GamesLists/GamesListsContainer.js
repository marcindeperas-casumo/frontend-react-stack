import React from "react";
import ListContainer from "../../components/ListContainer";
import GameBrowserService from "../../applicationService/GameBrowserService";
import { trace } from "../../utils";
import GamesListsSkeleton from "./GamesListsSkeleton";

export default class GamesListsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  componentWillMount() {
    this.setState({ ...this.state, loading: true });

    GameBrowserService.allTopLists()
      .then(trace)
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          data,
        });
      })
      .catch(e => {
        this.setState({
          ...this.state,
          loading: false,
          data: [],
        });
        console.error(e);
      });
  }

  render() {
    const { data, loading } = this.state;

    return (
      <React.Fragment>
        {loading && <GamesListsSkeleton />}
        {!loading && data.map(x => <ListContainer key={x.title} {...x} />)}
      </React.Fragment>
    );
  }
}
