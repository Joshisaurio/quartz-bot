const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config({ path: './env/info.env' });

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const commands = require('./commands/export');

const messageHandlers = []; 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration
    ],
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commands[commandName]) {
        commands[commandName](interaction);
    } else {
        await interaction.reply({ content: 'Command file not found', flags: 64 });
    }
});

client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;

    for (const handler of messageHandlers) {
        handler(message);
    }
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
