const { Client, Events, GatewayIntentBits, ChannelType, WebhookClient, AuditLogEvent } = require('discord.js');
const { token } = require('./env/info.env');
const commands = require('./commands/export');

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
		await interaction.editReply({ content: 'Command file not found' });
	}

});

client.on(Events.MessageCreate, message => {
    for (const handler of messageHandlers) {
		handler(message);
	}
});

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
