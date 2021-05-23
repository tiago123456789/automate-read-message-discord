const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = class DiscordNotification {

    constructor() {
        this._listen;
    }

    listenMessage(callback) {
        this._listen = callback;
        return this;
    }

    init() {
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });
        client.on('message', this._listen);
        client.login(process.env.TOKEN_DISCORD);
    }
}
