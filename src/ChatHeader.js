import React from "react";
import PropTypes from "prop-types";

export default class ChatHeader extends React.Component {
  render() {
    const { onClickButton, scope } = this.props;
    const title = scope === "round" ? "Chat" : "Lobby Chat";
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
  scope: PropTypes.oneOfType([s=>{s=="lobby"}, s=>{s=="round"}]).isRequired,
  onClickButton: PropTypes.func.isRequired,
};
