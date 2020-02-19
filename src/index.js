import React from "react";
import PropTypes from "prop-types";

import ChatLog from "./ChatLog";
import ChatHeader from "./ChatHeader";
import ChatClosedButton from "./ChatClosedButton";
import "./style.less";

export class ChatRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: true,
    };
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

ChatRound.propTypes = {
  stage: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

export class ChatLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: true,
    };
  }

  onClickButton = () => {
    const { isChatOpen } = this.state;
    this.setState({
      isChatOpen: !isChatOpen,
    });
  };

  render() {
    const { isChatOpen } = this.state;

    const { gameLobby } = this.props;
    const messages = gameLobby.get("chat")
      ? gameLobby.get("chat").map(({ text, playerId }) => ({
          text,
          subject: gameLobby.queuedPlayerIds.find(p => p === playerId),
        }))
      : [];

    return (
      <div className="empirica-chat-container" style={{ marginTop: "5rem" }}>
        {isChatOpen ? (
          <div className="empirica-chat-open">
            <ChatHeader scope="lobby" onClickButton={this.onClickButton} />
            <ChatLog scope="lobby" messages={messages} {...this.props} />
          </div>
        ) : (
          <ChatClosedButton scope="lobby" onClickButton={this.onClickButton} />
        )}
      </div>
    );
  }
}

ChatLobby.propTypes = {
  player: PropTypes.object.isRequired,
  gameLobby: PropTypes.object.isRequired,
};
