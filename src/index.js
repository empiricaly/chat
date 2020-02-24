import React from "react";
import PropTypes from "prop-types";

import ChatLog from "./ChatLog";
import ChatHeader from "./ChatHeader";
import ChatClosedButton from "./ChatClosedButton";
import "./style.less";

export class Chat extends React.Component {
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

  // getMessages = (stage, game) =>
  //   stage.get("chat")
  //     ? stage.get("chat").map(({ text, playerId }) => ({
  //         text,
  //         subject: game.players.find(p => p._id === playerId),
  //       }))
  //     : [];

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

  // shouldComponentUpdate(nextProps) {
  //   console.log('ini nextProps ', nextProps)
  // }

  onClickButton = () => {
    const { isChatOpen } = this.state;
    this.setState({
      isChatOpen: !isChatOpen,
    });
  };

  // getMessages = game =>
  //   game.get("chat")
  //     ? game.get("chat").map(({ text, playerId }) => ({
  //         text,
  //         subject: game.queuedPlayerIds.find(p => p === playerId),
  //       }))
  //     : [];

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

LobbyChat.propTypes = {
  player: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};
