import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"
import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class GameLobby extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  renderPlayersReady = () => {
    return (
      <div className="game-lobby">
        <NonIdealState
          icon={IconNames.PLAY}
          title="Game loading..."
          description="Your game will be starting shortly, get ready!"
        />
      </div>
    );
  };

  render() {
    const { game, treatment } = this.props;

    const total = treatment.factor("playerCount").value;
    const existing = game.playerIds.length;

    if (existing >= total) {
      return this.renderPlayersReady();
    }

    return (
      <div className="game-lobby">
        <NonIdealState
          icon={IconNames.TIME}
          title="Lobby"
          description={
            <>
              <p>Please wait for the game to be ready...</p>
              <p>
                {existing} / {total} players ready.
              </p>
            </>
          }
        />
      </div>
    );
  }
}

GameLobby.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  treatment: PropTypes.object.isRequired,
};
