const 
  Events = require(`${__dirname}/handlers/ClientEvents`),
  Components = require(`${__dirname}/handlers/Components`),
  GlobalCommands = require(`${__dirname}/handlers/GlobalCommands`),
  GuildCommands = require(`${__dirname}/handlers/GuildCommands`),
  Interaction = require(`${__dirname}/handlers/Interaction`),
  Mongo = require(`${__dirname}/handlers/MongoEvents`),
  MessageEvents = require(`${__dirname}/handlers/MessageEvents`),
  Message = require(`${__dirname}/handlers/MessageCommands`),
  Topggvote = require(`${__dirname}/handlers/topggvote`)

module.exports = {
  Events,
  Components,
  GlobalCommands,
  GuildCommands,
  Interaction,
  MessageEvents,
  Mongo,
  Message,
  Topggvote
}
