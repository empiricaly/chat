import PropTypes from "prop-types";
import React from "react";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEl = React.createRef();
  }

  componentDidMount() {
    this.messagesEl.current.scrollTop = this.messagesEl.current.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    const { messages: prevMessages } = prevProps;
    const { messages: currentMessages } = this.props

    if (prevMessages && currentMessages && (prevMessages.length < currentMessages.length)) {
      this.messagesEl.current.scrollTop = this.messagesEl.current.scrollHeight;
    }
  }

  render() {
    const { player, scope, customKey, filter, messageComp: MessageComp } = this.props;

    let messages = scope.get(customKey) || [];
    if (filter) {
      messages = filter(messages);
    }

    return (
      <div className="messages" ref={this.messagesEl}>
        {messages.length === 0 ? <div className="empty">No messages yet...</div> : null}
        {messages.map((message, i) => {
          return (
            <MessageComp key={i} message={message} player={player} self={message.playerId === player._id} />
          );
        })}
      </div>
    );
  }
}

Messages.propTypes = {
  player: PropTypes.object,
  scope: PropTypes.object.isRequired,
  customKey: PropTypes.string.isRequired,
  messageComp: PropTypes.elementType,
  filter: PropTypes.func
};
