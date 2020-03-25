import React from "react";
import PropTypes from "prop-types";

import Messages from "./Messages";
import ChatFooter from "./ChatFooter";
import "./style.less";

export default class ChatLog extends React.Component {
  render() {
    const { scope, player, messages, chatId } = this.props;
    let footerProps = {
      scope,
      player,
      chatId
    };

    footerProps =
      scope === "round"
        ? { ...footerProps, stage: this.props.stage }
        : { ...footerProps, game: this.props.game };

    return (
      <div className="chat">
        <Messages scope={scope} messages={messages} player={player} />
        <ChatFooter {...footerProps} />
      </div>
    );
  }
}

ChatLog.propTypes = {
  scope: PropTypes.oneOfType(["lobby", "round"]).isRequired,
  messages: PropTypes.array.isRequired,
  stage: PropTypes.object,
  game: PropTypes.object,
  player: PropTypes.object.isRequired,
};
