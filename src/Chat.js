import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Message from "./Message";
import Messages from "./Messages";
import ErrorBoundary from "./ErrorBoundary";

export default class Chat extends React.PureComponent {
  state = { isOpen: true, unreadMsg: 0 };

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  addUnreadMsg = () => {
    this.setState(
      {
        unreadMsg: this.state.unreadMsg + 1,
      },
      () => {
        const { onIncommingMessage } = this.props;
        if (onIncommingMessage) {
          onIncommingMessage(this.state.unreadMsg);
        }
      }
    );
  };

  resetUnreadMsg = (e) => {
    const { isOpen, unreadMsg } = this.state;
    if (this.node.contains(e.target) && isOpen && unreadMsg > 0) {
      this.setState({ unreadMsg: 0 });
    }
  };

  onNewMessage = (msg) => {
    const { onNewMessage, scope, customKey } = this.props;

    if (onNewMessage) {
      msg = onNewMessage(msg, this.state.unreadMsg);
      if (!msg) {
        return;
      }
    }

    scope.append(customKey, msg);
  };

  componentDidMount = () => {
    const { dockStartOpen, docked } = this.props;
    document.addEventListener("click", this.resetUnreadMsg);
    if (docked && !dockStartOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.resetUnreadMsg);
  }

  render() {
    const { isOpen, unreadMsg } = this.state;
    const {
      player,
      scope,
      customKey,
      customClassName,
      docked,
      hideNotificiationBadge,

      filter,
      timeStamp,

      header: HeaderComp,
      message: MessageComp,
      footer: FooterComp,
      ...rest
    } = this.props;

    const common = { player, scope, customKey };

    return (
      <ErrorBoundary>
        <div
          className={`${
            customClassName ? customClassName : "empirica-chat-container"
          } ${docked ? "docked" : "undocked"}`}
        >
          <div
            className={`chat ${isOpen ? "open" : ""}`}
            ref={(node) => (this.node = node)}
          >
            {docked && (
              <HeaderComp
                {...common}
                onClick={this.onClick}
                isOpen={isOpen}
                unreadMsg={unreadMsg}
                hideNotificiationBadge={hideNotificiationBadge}
              />
            )}
            {isOpen ? (
              <>
                <Messages
                  {...common}
                  messageComp={MessageComp}
                  filter={filter}
                  addUnreadMsg={this.addUnreadMsg}
                  {...rest}
                />
                <FooterComp
                  {...common}
                  timeStamp={timeStamp}
                  onNewMessage={this.onNewMessage}
                  resetUnreadMsg={this.resetUnreadMsg}
                  unreadMsg={this.state.unreadMsg}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

Chat.defaultProps = {
  customKey: "chat",
  docked: false,
  customClassName: "",
  dockStartOpen: true,
  hideAvatar: false,
  hideName: false,
  svgAvatar: false,
  hideNotificiationBadge: false,
  header: ({ onClick, isOpen, unreadMsg, hideNotificiationBadge }) => (
    <>
      <div
        className="header"
        data-badge={unreadMsg > 0 && !hideNotificiationBadge ? unreadMsg : null}
      >
        <span className="title">CHAT </span>
        <span className="close-button" onClick={onClick}>
          {isOpen ? "-" : "+"}
        </span>
      </div>
    </>
  ),
  message: Message,
  footer: Footer,
};

Chat.propTypes = {
  player: PropTypes.object.isRequired,
  scope: PropTypes.object.isRequired,
  customKey: PropTypes.string.isRequired,
  timeStamp: PropTypes.instanceOf(Date),
  docked: PropTypes.bool,
  dockStartOpen: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  hideNotificiationBadge: PropTypes.bool,
  svgAvatar: PropTypes.bool,
  customClassName: PropTypes.string,

  onNewMessage: PropTypes.func,
  onIncommingMessage: PropTypes.func,
  filter: PropTypes.func,

  header: PropTypes.elementType.isRequired,
  message: PropTypes.elementType.isRequired,
  footer: PropTypes.elementType.isRequired,
};
