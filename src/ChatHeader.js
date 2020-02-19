import React from "react";
import PropTypes from "prop-types";

export default class ChatHeader extends React.Component {
  render() {
    const { onClickButton, scope } = this.props;
    const title = scope === "round" ? "Chat" : "Chat Lobby";
    return (
      <div className="header">
        <span className="title">{title}</span>
        <span className="close-button" onClick={onClickButton}>
          &times;
        </span>
      </div>
    );
  }
}

ChatHeader.propTypes = {
  scope: PropTypes.oneOfType(["lobby", "round"]).isRequired,
  onClickButton: PropTypes.func.isRequired,
};
