import PropTypes from "prop-types";
import React from "react";
import Chat from "./Chat";
import GameLobby from "./GameLobby";

export default class LobbyChat extends React.PureComponent {
  render() {
    return (
      <div>
        <GameLobby {...this.props} />
        <Chat {...this.props} />
      </div>
    );
  }
}

LobbyChat.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  treatment: PropTypes.object.isRequired
};
