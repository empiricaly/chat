import React from "react";
import PropTypes from "prop-types";

export default class ChatClosedButton extends React.Component {
  render() {
    const { onClickButton, scope } = this.props;
    const title = scope === "round" ? "Chat" : "Lobby Chat";

    return (
      <div className="empirica-chat-close" onClick={onClickButton}>
        <span className="close-text">{title}</span>
      </div>
    );
  }
}

ChatClosedButton.propTypes = {
  scope: PropTypes.oneOfType([s=>{s=="lobby"}, s=>{s=="round"}]).isRequired,
  onClickButton: PropTypes.func.isRequired,
};
