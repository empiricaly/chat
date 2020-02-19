import React from "react";
import PropTypes from "prop-types";

export default class ChatClosedButton extends React.Component {
  render() {
    const { onClickButton, scope } = this.props;
    const title = scope === "round" ? "Chat" : "Chat Lobby";

    return (
      <div className="empirica-chat-close" onClick={onClickButton}>
        <span className="close-text">{title}</span>
      </div>
    );
  }
}

ChatClosedButton.propTypes = {
  scope: PropTypes.oneOfType(["lobby", "round"]).isRequired,
  onClickButton: PropTypes.func.isRequired,
};
