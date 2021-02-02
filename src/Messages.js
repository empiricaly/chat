import PropTypes from "prop-types";
import React from "react";

function filteredMessages(WrappedComponent) {
  return class extends React.PureComponent {
    render() {
      const { scope, customKey, filter, ...rest } = this.props;
      let messages = scope.get(customKey) || [];
      if (filter) {
        messages = filter(messages);
      }

      return <WrappedComponent messages={[...messages]} {...rest} />;
    }
  };
}

class Messages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.messagesEl = React.createRef();
    this.state = {
      unreadIndex: 0,
    };
  }

  setUnreadIndex = (index) => {
    this.setState({ unreadIndex: index });
  };

  componentDidMount() {
    this.messagesEl.current.scrollTop = this.messagesEl.current.scrollHeight;

    const { messages } = this.props;
    if (messages && messages.length > 0) {
      this.setUnreadIndex(messages.length);
    }
  }

  componentDidUpdate(prevProps) {
    const { messages: prevMessages } = prevProps;
    const { messages: currentMessages, addUnreadMsg, player } = this.props;
    const { unreadIndex } = this.state;

    if (
      this.messagesEl.current !== null &&
      currentMessages.length > prevMessages.length
    ) {
      for (let i = unreadIndex; i < currentMessages.length; i++) {
        if (currentMessages[i].player._id !== player._id) {
          addUnreadMsg();
        }
      }

      this.messagesEl.current.scrollTop = this.messagesEl.current.scrollHeight;
    }
  }

  render() {
    const { player, messages, messageComp: MessageComp, ...rest } = this.props;

    return (
      <div className="messages" ref={this.messagesEl}>
        {messages.length === 0 ? (
          <div className="empty">No messages yet...</div>
        ) : null}
        {messages.map((message, i) => {
          return (
            <MessageComp key={i} message={message} player={player} {...rest} />
          );
        })}
      </div>
    );
  }
}

Messages.propTypes = {
  player: PropTypes.object,
  messageComp: PropTypes.elementType,
  filter: PropTypes.func,
  addUnreadMsg: PropTypes.func,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  svgAvatar: PropTypes.bool,
};

export default filteredMessages(Messages);
