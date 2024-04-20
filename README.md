
# KAKASHI SELF HANDLER

A discord bot handler which has many options available like button handler, vote only commands, cooldown others.


## Features

- Global Slash Command Handler
- Guild Slash Command Handler
- Message Command Handler
- Button Handler
- Components Handler
- Topgg vote only Handler
- Commands, interaction cooldowns
- MongoDB event handler


## Installation
```bash
  npm install kakashi-self-handler
```
    
## Documentation
- Folder Structure

```
Kakashi Bot/
├── node_modules
├── src/ (main folder)
|   ├──commands/ (message commands)
|   |    └── Bot/ (command category)
│   │       └── ping.js
│   ├── scommands/ (slash commands)
│   │   └── Information/ (command category)
│   │       └── info.js
│   ├── components/ (component folder)
│   │   ├── buttons/ (component type)
│   │   │   └── ok-button.js
│   │   ├── contextMenus/ (component type)
│   │   ├── modals/ (component type)
│   │   └── selectMenus/ (component type)
│   ├── events/ (events folder)
│   │   ├── client/ (client event)
│   │   │   ├── interactionCreate.js
│   │   │   └── MessageCreate.js
│   │   │   └── ready.js
│   │   └── mongo/ (mongo schemas)
│   │       ├── connecting.js
│   │       └── disconnected.js
│   └── index.js (main bot file)
├── .env (your secrets)
├── package.json
└── package-lock.json
```
- Index.js
```js
const { Client, Partials, GatewayIntentBits } = require("discord.js");

/// Requiring the handler
const {GlobalCommands, GuildCommands Components, Events, MongoEvents, Topggvote, Message} = require('kakashi-self-handler');

/// creating the client
const client = new Client(
  {
    intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
    allowedMentions: {
      parse: ['users']
    },
  }
);

const clientID = client.user.id;
/// Using the Handlers

/// For handling global slash commands
GlobalCommands(
  './src/scommands',
  client,
  clientID,
  process.env.TOKEN /// your bot token
);

/// For registering guild slash command
/// Note dont use both Global and Slash command at once
GuildCommands(
    './src/scommands',
    client,
    clientID,
    GuildID, /// the guild id where you want the commands
    process.env.TOKEN
)

/// For handling message commands
Message(
  './src/commands',
  client
);

/// For handling events
Events(
  './src/events',
  client
)

/// For handling mongo schemas
Mongo(
  './src/events',
  client
)

/// For handling components
Components(
  './src/components',
  client
)

/// For handling voteOnly function

Topggvote(
  client,
  process.env.TOPGGTOKEN, ///your topgg token
  process.env.port, ///your topgg webhook port
  process.env.path, ///your topgg webhook path
  process.env.authorization, ///your topgg webhook authorization
  'https://top.gg/bot/760923630212874251/vote', ///your topgg bot vote link
  true, ///whether to send embed or not by default false
);
client.login(process.env.TOKEN)
```
- Interaction Event
```js
const {Interaction} = require('kakashi-self-handler')

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    try{
    await Interaction(interaction, client)
    } catch(err) {
      return console.log(err)
    }
  },
};
```
- Message Event
```js
const {MessageEvents} = require('kakashi-self-handler')
const prefix = '!'; /// prefix for bot
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    try{
    await MessageEvents(client, message, prefix)
    } catch(err) {
      return console.log(err)
    }
  },
};
```
- Slash command Example
```js
const {SlashCommandBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get pong reply'),
        category: 'Bot', /// optional can be usefull in help command
        cooldown: '7', /// 7 second cooldown the cooldown is optional.
    async execute(interaction, client) {
        interaction.reply({
            content: 'pong',
            ephemeral: true
        })
    }
}
```
- Message Command Example
```js
const { EmbedBuilder } = require('discord.js')
module.exports = {
  name: 'embed',
  description: 'Return embed',
  botPerms: ['EmbedLinks'],
  userPerms: ['ManageMessages'],
  category: 'Bot',
  cooldown: '9',
  async execute(message, client, args) {
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle(`${message.author.username}`)
      .setDescription(`this is an embed`);
    await message.reply({
      embeds: [embed],
    })

  }
}
```
- Button Example
```js
module.exports = {
  data: {
    name: 'ok-button', /// customID 
    cooldown: '15' /// 15 second cooldown the cooldown is optional.
  },
  async execute(interaction, client) {
    interaction.reply({
      content: 'This button is working',
      ephemeral: true
    })
  }
}
```

## Information 

#### For other components like select menu and other handler same use customID on name

#### The handler only handles mongo schemas so you need to connect to mongo yourself

#### If you dont want cooldowns on your command dont put the cooldown: '7' part on your commands, buttons

#### If you donot need voteonly commands then please remove the Topggvote() part from your index.js or main file.


## Screenshots
- Normal vote message without embed

![](https://i.imgur.com/0FQv87q.png?1)

- Vote message with embed

![](https://i.imgur.com/b4j7Rhn.png)

- Cooldown Embed

![Cooldown embed screenshot](https://i.imgur.com/3DkmpaW.png)

- Permission Message

![](https://i.imgur.com/q8nLVQF.png)
## Authors

- [@kakashidracq](https://github.com/kakashidracq)

![Discord](https://discord.c99.nl/widget/theme-2/614018799212953611.png)
## Support

[Discord](https://discord.gg/mTxBX87Bdr)