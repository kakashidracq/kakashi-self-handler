# KAKASHI-SELF-HANDLER

## Introduction

> A discord handler for discord bots

## Code Samples

## Documentation

### • Creating the Handler
```js
const Kakashi = require("kakashi-self-handler");
const kakashi = new Handler();
```

### • Folder Structure
 it's recommended to use the following structure:
```
Kakashi Bot/
├── node_modules
├── src/
|   ├──commands/
|   |    └── moderation/
│   │       └── kick.js
│   ├── scommands/
│   │   └── moderation/
│   │       └── kick.js
│   ├── components/
│   │   ├── buttons/
│   │   │   └── ok-button.js
│   │   ├── contextMenus/
│   │   ├── modals/
│   │   └── selectMenus/
│   ├── events/
│   │   ├── client/
│   │   │   ├── ready.js
│   │   │   └── interactionCreate.js
│   │   └── mongo/
│   │       ├── connecting.js
│   │       └── disconnected.js
│   └── index.js
├── .env
├── package.json
└── package-lock.json
```

### • Handling Events (Client Events)
```js
kakashi.ClientEvents("./src/events/client", client);
```

### • Handling MongoDB (Mongoose) 
```js
kakashi.MongoEvents("./src/events/mongo", client);
```

### • Handling Components (Buttons, Context Menus, Select Menus, and Modals) 
```js
(async () => {
  await kakashi
    .Components("./src/components", client);
})();
```

### • Handling Global Commands
#### You cannot use both Global commands AND Guild commands. Please select on handler.
```js

handler.handleGlobalCommands(
  "./src/commands",
  client,
  "clientID",
  clienttoken
);
```

### • Handling Guild Commands 
#### You cannot use both Global commands and Guild commands. Please select on handler.
```js
kakashi.GuildCommands(
  "./src/scommands",
  client,
  ClientID,
  "serverid",
  token
);
```

### • Handling Interactions 
#### Your 'interactionCreate' event should look like the following:
```js
const Kakashi = require("kakashi-self-handler");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const kakashi = new Kakashi();
    await kakashi.Interaction(interaction, client);
  },
};

```

### • Handling Message
#### Your 'MessageCreate' event should look like the following:
```js
* on prefix you should put your message prefix
FOR EXAMPLE
const Kakashi = require("kakashi-self-handler");
const prefix = ';'
module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const kakashi = new Kakashi();
    await kakashi.Interaction(message, client, prefix);
  },
};

```



### • Demo
```js
require("dotenv").config(); // Storing bot token with .ENV which is recommended.
const { Client } = require("discord.js");
const Kakashi = require("kakashi-self-handler");
const kakashi = new Kakashi();
const client = new Client({ intents: 131071 });

// Discord.js Event Handler:
kakashi.ClientEvents("./src/events/client", client);

// MongoDB event Handler: (using mongoose)
kakashi.MongoEvents("./src/events/mongo", client);

// Discord.js Components Handler:
(async () => {
  await kakashi
    .Components("./src/components", client);
})();

kakashi.GuildCommands(
  "./src/commands",
  client,
  clientID,
  "serverid",
  token
);

client.login(process.env.token);
```

## Installation

Install kakashi-self-handler with npm

```bash
  npm install kakashi-self-handler
```