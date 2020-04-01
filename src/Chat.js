import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Message from "./Message";
import Messages from "./Messages";

export default class Chat extends React.PureComponent {
  state = { isChatOpen: true };

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onNewMessage = msg => {
    const { onNewMessage, scope, customKey } = this.props;

    if (onNewMessage) {
      msg = onNewMessage(msg);
      if (!msg) {
        return;
      }
    }

    scope.append(customKey, msg);
  };

  render() {
    const { isOpen } = this.state;
    const {
      player,
      scope,
      customKey,

      filter,

      header: HeaderComp,
      closed: ClosedComp,
      message: MessageComp,
      footer: FooterComp
    } = this.props;

    const common = { player, scope, customKey };

    return (
      <div className="empirica-chat-container">
        {isOpen ? (
          <div className="empirica-chat-open">
            <HeaderComp {...common} onClick={this.onClick} />
            <div className="chat">
              <Messages {...common} messageComp={MessageComp} filter={filter} />
              <FooterComp {...common} onNewMessage={this.onNewMessage} />
            </div>
          </div>
        ) : (
          <ClosedComp {...common} onClick={this.onClick} />
        )}
      </div>
    );
  }
}

Chat.defaultProps = {
  customKey: "chat",

  header: ({ onClick }) => (
    <div className="header">
      <span className="title">Chat</span>
      <span className="close-button" onClick={onClick}>
        &times;
      </span>
    </div>
  ),
  closed: ({ onClick }) => (
    <div className="empirica-chat-closed" onClick={onClick}>
      <span className="close-text">Chat</span>
    </div>
  ),
  message: Message,
  footer: Footer
};

Chat.propTypes = {
  player: PropTypes.object.isRequired,
  scope: PropTypes.object.isRequired,
  customKey: PropTypes.string.isRequired,

  onNewMessage: PropTypes.func,
  filter: PropTypes.func,

  header: PropTypes.elementType.isRequired,
  closed: PropTypes.elementType.isRequired,
  message: PropTypes.elementType.isRequired,
  footer: PropTypes.elementType.isRequired
};
