const { VoteClient } = require('topgg-votes');

/**
 * @param {Client} client - Discord Client.
 * @param {string} token - Topgg token.
 * @param {string} port - Topgg webhook port.
 * @param {string} path - Topgg webhook path.
 * @param {string} authorization - Topgg Webhook authorization token.
 * @param {string} voteurl - Top.gg vote URL.
 * @param {boolean} [embed=false] - Whether to use embeds for logging.
 */

async function handleGuildCommands(
  client,
  token,
  port,
  path,
  authorization,
  voteurl,
  embed,
) {
    try{
        client.topgg = new VoteClient({
            token: token,
            webhook: {
              port: port,
              path: path,
              authorization: authorization
            }
        })
        client.topgg.url = voteurl;
        client.topgg.embed = embed || false
        console.log(`Topgg connected to ${port}`)
    } catch(err) {
        console.log(err)
    }
}

module.exports = handleGuildCommands;
