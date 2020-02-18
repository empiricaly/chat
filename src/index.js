import React from "react";
import PropTypes from "prop-types";

import ChatLog from "./ChatLog";
import ChatHeader from "./ChatHeader";
import ChatClosedButton from "./ChatClosedButton";
import "./style.less";

export default class Chat extends React.Component {
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
  }

  render() {
    const { scope, game, stage, player } = this.props;
    const { isChatOpen } = this.state;

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
            <ChatHeader onClickButton={this.onClickButton} />
            <ChatLog messages={messages} stage={stage} player={player} />
          </div>
        ) : (
          <ChatClosedButton onClickButton={this.onClickButton} />
        )}
      </div>
    );
  }
}

Chat.propTypes = {
  scope: PropTypes.oneOfType(["lobby", "round"]).isRequired,
  stage: PropTypes.object,
  player: PropTypes.object,
  game: PropTypes.object,
};
