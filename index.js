require('dotenv').config({ path: './env/info.env' });

const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`logged in as ${readyClient.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
