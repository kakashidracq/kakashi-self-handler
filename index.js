class Kakashi {
  ClientEvents = require(`${__dirname}/handlers/ClientEvents`);
  Components = require(`${__dirname}/handlers/Components`);
  GlobalCommands = require(`${__dirname}/handlers/GlobalCommands`);
  GuildCommands = require(`${__dirname}/handlers/GuildCommands`);
  Interaction = require(`${__dirname}/handlers/Interaction`);
  MongoEvents = require(`${__dirname}/handlers/MongoEvents`);
  MessageEvents = require(`${__dirname}/handlers/MessageEvents`);
  MessageCommands = require(`${__dirname}/handlers/MessageCommands`)
}

module.exports = Kakashi;
