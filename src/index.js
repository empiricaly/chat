import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import ChatLog from "./ChatLog";
import ChatHeader from "./ChatHeader";
import ChatClosedButton from "./ChatClosedButton";
import GameLobby from "./GameLobby";
import "./style.less";

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: true,
    };
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  onClickButton = () => {
    const { isChatOpen } = this.state;
    this.setState({
      isChatOpen: !isChatOpen,
    });
  };

  render() {
    const { isChatOpen } = this.state;
    const { stage, game, player } = this.props;

    const messages = stage.get("chat")
      ? stage.get("chat").map(({ text, playerId }) => ({
          text,
          subject: game.players.find(p => p._id === playerId),
        }))
      : [];

    return (
      <div className="empirica-chat-container">
        {isChatOpen ? (
          <div className="empirica-chat-open">
            <ChatHeader scope="round" onClickButton={this.onClickButton} />
            <ChatLog scope="round" messages={messages} stage={stage} player={player} />
          </div>
        ) : (
          <ChatClosedButton scope="round" onClickButton={this.onClickButton} />
        )}
      </div>
    );
  }
}

Chat.propTypes = {
  stage: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

export class LobbyChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: true,
    };
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props, nextProps);
  }

  onClickButton = () => {
    const { isChatOpen } = this.state;
    this.setState({
      isChatOpen: !isChatOpen,
    });
  };

  render() {
    const { isChatOpen } = this.state;

    const { game } = this.props;
    const messages = game.get("chat")
      ? game.get("chat").map(({ text, playerId }) => ({
          text,
          subject: game.queuedPlayerIds.find(p => p === playerId),
        }))
      : [];

    return (
      <div>
        <GameLobby {...this.props} />
        <div className="empirica-chat-container">
          {isChatOpen ? (
            <div className="empirica-chat-open">
              <ChatHeader scope="lobby" onClickButton={this.onClickButton} />
              <ChatLog scope="lobby" messages={messages} {...this.props} />
            </div>
          ) : (
            <ChatClosedButton scope="lobby" onClickButton={this.onClickButton} />
          )}
        </div>
      </div>
    );
  }
}

LobbyChat.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  treatment: PropTypes.object.isRequired,
};
