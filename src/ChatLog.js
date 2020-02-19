import React from "react";
import PropTypes from "prop-types";

import Messages from "./Messages";
import ChatFooter from "./ChatFooter";
import "./style.less";

export default class ChatLog extends React.Component {
  render() {
    const { scope, player, messages } = this.props;
    let footerProps = {
      scope,
      player,
    };

    footerProps =
      scope === "round"
        ? { ...footerProps, stage: this.props.stage }
        : { ...footerProps, gameLobby: this.props.gameLobby };

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
  gameLobby: PropTypes.object,
  player: PropTypes.object.isRequired,
};
