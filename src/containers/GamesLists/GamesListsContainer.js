import React from "react";
import GameBrowserService from "../../applicationService/GameBrowserService";
import GameList from "../../components/GameList";
import { identity } from "../../utils";
import GamesListsSkeleton from "./GamesListsSkeleton";

export default class GamesListsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });

    Promise.all([
      GameBrowserService.latestPlayedGames(),
      GameBrowserService.allTopLists(),
    ])
      .then(([latestPlayedGames, allTopLists]) => {
        // `latestPlayedGames` could be `null`, in case the player hasn't played any
        // game yet. That is why we need to run a identity filter.
        return [latestPlayedGames, ...allTopLists].filter(identity);
      })
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
        {!loading && data.map(x => <GameList key={x.title} {...x} />)}
      </React.Fragment>
    );
  }
}
