import React from "react";
import PropTypes from "prop-types";

import ChatLog from "./ChatLog";
import ChatHeader from "./ChatHeader";
import ChatClosedButton from "./ChatClosedButton";
import "./style.less";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: true,
    };
  }

  onClickButton() {
    const { isChatOpen } = this.state;
    this.setState({
      isChatOpen: !isChatOpen,
    });
  }

  render() {
    const { messages, stage, player } = this.props;
    const { isChatOpen } = this.state;

    return (
      <div className="empirica-chat-container">
        {isChatOpen ? (
          <div className="empirica-chat-open">
            <ChatHeader onClickButton={() => this.onClickButton()} />
            <ChatLog messages={messages} stage={stage} player={player} />
          </div>
        ) : (
          <ChatClosedButton onClickButton={() => this.onClickButton()} />
        )}
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  stage: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};
