import React from "react";
import PropTypes from "prop-types";

import Message from "./Message";
import "./style.less";

export default class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
    }
  }

  getSelf = (scope, message, player) => {
    if (scope === "round") {
      return message.subject ? player._id === message.subject._id : null;
    }

    return message.subject ? player._id === message.subject : null;
  };

  render() {
    const { messages, player, scope } = this.props;
    return (
      <div className="messages" ref={el => (this.messagesEl = el)}>
        {messages.length === 0 ? <div className="empty">No messages yet...</div> : null}
        {messages.map((message, i) => {
          return (
            <Message
              key={i}
              message={message}
              self={this.getSelf(scope, message, player)}
            />
          );
        })}
      </div>
    );
  }
}

Messages.propTypes = {
  scope: PropTypes.oneOfType([s=>{s=="lobby"}, s=>{s=="round"}]).isRequired,
  messages: PropTypes.array.isRequired,
  player: PropTypes.object,
};
