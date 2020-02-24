# Empirica Chat

This package contains a React component for a Chat in Lobby and Chat in Round for Empirica.

## Usage Chat in Lobby

For Chat in Lobby, you can simply add the `LobbyChat` component like this on `client/main.js` file.

```js
import { LobbyChat } from "@empirica/chat";

//...

Empirica.lobby(LobbyChat)

```

## Usage Chat in Round

```js
import { Chat } from "@empirica/chat";

//...

<Chat stage={stage} game={game} player={player}/>;

```

`Chat` expects 3 props:

- game: a props from Empirica
- stage: a props from Empirica
- player: a props from Empirica