const MessageQueue = require('./MessageQueue');
require("dotenv").config();

const DiscordNotification = require('./DiscordNotification');
const ReaderNotification = require('./ReaderNotification');

const messagesDiscord = new MessageQueue();

new DiscordNotification()
    .listenMessage((msg) => {
        const message = `Mensagem do ${msg.author.username} no canal ${msg.channel.name}: ${msg.content}`;
        messagesDiscord.add(message);
    })
    .init();

new ReaderNotification().language("pt").listenNewMessage(messagesDiscord)

