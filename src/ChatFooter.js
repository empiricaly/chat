import React from "react";
import PropTypes from "prop-types";

export default class ChatFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const text = this.state.comment.trim();
    if (text !== "") {
      const { scope } = this.props;

      if (scope === "round") {
        const { stage, player } = this.props;
        stage.append("chat", {
          text,
          playerId: player._id,
        });
      } else {
        const { game, player } = this.props;
        game.append("chat", {
          text,
          playerId: player._id,
        });
      }

      this.setState({ comment: "" });
    }
  };

  handleChange = e => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  render() {
    const { comment } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="chat-footer">
          <input
            name="comment"
            type="text"
            className="chat-input"
            placeholder="Enter chat message"
            value={comment}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <button type="submit" className="chat-button-send">
            Send
          </button>
        </div>
      </form>
    );
  }
}

ChatFooter.propTypes = {
  scope: PropTypes.oneOfType(["lobby", "round"]).isRequired,
  player: PropTypes.object.isRequired,
  stage: PropTypes.object,
  game: PropTypes.object,
};
