import React from "react";
import PropTypes from "prop-types";

import Message from "./Message";
import "./style.less";

const chatSound = new Audio("./assets/unsure.mp3");

export default class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      chatSound.play();
    }
  }
  render() {
    const { messages, player } = this.props;
    return (
      <div className="messages" ref={el => (this.messagesEl = el)}>
        {messages.length === 0 ? <div className="empty">No messages yet...</div> : null}
        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            self={message.subject ? player._id === message.subject._id : null}
          />
        ))}
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  player: PropTypes.object,
};
