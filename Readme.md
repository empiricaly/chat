# Empirica Chat

This package contains a React component for a Chat in Lobby and Chat in Round
for Empirica.

Add to your Empirica project with:

```sh
meteor npm install --save @empirica/chat
```

## Usage

```jsx
import { Chat } from "@empirica/chat";

//...

<Chat player={player} scope={game} />;
```

`Chat` expects 2 required props:

- `player`: the current player
- `scope`: object that the chat will be attached to, can be game, round, or
  stage objects.

### Multiple chat instances within the same scope

You can pass an optional `key` string prop to differenciate different chats
within the same scope. This changes which key on the given scope the chat will
be recorded to.

```jsx
<Chat player={player} scope={game} key="casual_chat" />
```

### Filtering which messages to show

You can filter out which messages to show in the chat with the `filter`
callback. The `filter` call back will be called with all messages in an array
before they are displayed. You can return any transformation of that array. This
allows to filter an/or inject data into the messages at display time. For
example, don't show messages that include the word "pizza":

```jsx
<Chat
  player={player}
  scope={game}
  filter={msgs => msgs.filter(msg => !msg.text.includes("pizza"))}
/>
```

### Transforming the message before creation

Before each message is created (after the player submits the message), the
`onNewMessage` callback give the oppertunity to modify the message.

For example, you might want to attach extra metadata on the message:

```jsx
<Chat
  player={player}
  scope={game}
  onNewMessage={msg => {
    msg.period = "blue";
    return msg;
  }}
/>
```

If you return nother from the callback, the message will not be created, this
way you can filter messages before they are created. For example, you really
don't like pizza:

```jsx
<Chat
  player={player}
  scope={game}
  onNewMessage={msg => (msg.text.includes("pizza") ? null : msg)}
/>
```

### Customizing the UI

The default UI's CSS is scoped to `.empirica-chat-container`. Feel free to
override any object for simple UI changes. See `./src/style.less` for details
about the CSS.

If you require further customization, you can override the core UI components
like this:

```jsx
<Chat player={player} scope={round} header={null} message={Message} />
```

If you pass null to any component override, the component will not render (in
the example above, we removed the chat header).

The available component overrides are as follow:

- `header`: The header of the open chat window.
- `closed`: The header of the closed chat window.
- `message`: A message (with body and author info)
- `footer`: The footer of the chat window, which contains the input by default.

All components receive the `player`, `scope`, and `key` props. `header` and
`closed` also receive an `onClick` prop, that will toggle chat window open and
closed. And `footer` receives `onNewMessage` which new messages should be sent
to. See existing components in `./src` for details.

## Usage: Chat in Lobby

To use the Chat in the Lobby, you can simply add the `LobbyChat` component of
this package in your experiment's `./client/main.js` file, like this:

```js
import { LobbyChat } from "@empirica/chat";

//...

Empirica.lobby(LobbyChat);
```

If you wish to further configure the Lobby chat, you will need to create a lobby
component on the example found in `./src/LobbyChat.js`.

# Development

To build the package, run `npm run build`.
